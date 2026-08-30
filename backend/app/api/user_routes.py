from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.schemas.user_schema import UserCreate
from app.services.user_service import create_user, get_user_by_email
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.schemas.user_schema import UserProfileUpdate
from app.services.user_service import update_user_profile
router = APIRouter()


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = create_user(
    db=db,
    name=user.name,
    email=user.email,
    password=user.password,
)

    return {
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "career_goal": new_user.career_goal,
            "education": new_user.education,
            "experience": new_user.experience,
            "skills": new_user.skills,

            "github" : new_user.github,

            "linkedin" : new_user.linkedin
        },
    }
@router.put("/profile")
def update_profile(
    profile: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    updated_user = update_user_profile(
        db,
        current_user,
        profile
    )

    return {
        "message": "Profile updated successfully",
        "user": {
            "id": updated_user.id,
            "name": updated_user.name,
            "email": updated_user.email,
            "career_goal": updated_user.career_goal,
            "education": updated_user.education,
            "experience": updated_user.experience,
            "skills": updated_user.skills,
            "github": updated_user.github,
            "linkedin": updated_user.linkedin
        }
    }

@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "career_goal": current_user.career_goal,
        "education": current_user.education,
        "experience": current_user.experience,
        "skills": current_user.skills,
        "github": current_user.github,
        "linkedin": current_user.linkedin,
    }