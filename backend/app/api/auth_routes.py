from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import secrets
from app.config import FRONTEND_URL
from app.services.email_service import send_reset_email

from app.database.deps import get_db
from app.services.auth_service import authenticate_user
from app.services.user_service import (
    get_user_by_email,
    create_user,
)
from app.core.auth import create_access_token
from app.models.user import User
from app.core.security import hash_password
from app.schemas.user_schema import UserCreate


router = APIRouter()


# =========================
# LOGIN
# =========================

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# =========================
# REGISTER
# =========================

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    create_user(
        db,
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User registered successfully"
    }


# =========================
# FORGOT PASSWORD
# =========================

class ForgotPasswordRequest(BaseModel):
    email: str


@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    user = get_user_by_email(db, data.email)

    # Don't reveal whether the email exists
    if not user:
        return {
            "message": "If the email exists, a password reset link has been sent."
        }

    # Generate secure token
    reset_token = secrets.token_urlsafe(32)

    # Save token and expiry
    user.reset_token = reset_token
    user.reset_token_expires = datetime.now() + timedelta(minutes=30)

    db.add(user)
    db.commit()
    db.refresh(user)

    # Create frontend reset link
    reset_link = (
        f"{FRONTEND_URL}/reset-password?token={reset_token}"
    )

    # Send email
    try:
        send_reset_email(
            recipient_email=user.email,
            reset_link=reset_link,
        )
    except Exception as e:
        print("Email Error:", e)

        raise HTTPException(
            status_code=500,
            detail="Unable to send password reset email."
        )

    return {
        "message": "Password reset link has been sent to your email."
    }
   

   


# =========================
# RESET PASSWORD
# =========================

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.reset_token == data.token)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset token"
        )

    # Check expiration
    now = datetime.now(timezone.utc)
    token_expires = user.reset_token_expires

    # SQLite returns DateTime values without timezone information.
    if token_expires and token_expires.tzinfo is None:
        token_expires = token_expires.replace(tzinfo=timezone.utc)

    if (
        not token_expires
        or token_expires < now
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired reset token"
        )

    # Update password
    user.password = hash_password(data.new_password)

    # Invalidate token
    user.reset_token = None
    user.reset_token_expires = None

   
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "Password reset successfully"
    }