from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.core.auth import verify_access_token
from app.services.user_service import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)







def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("\n========== DEBUG ==========")
    print("Received Token:", token)

    email = verify_access_token(token)

    print("Email from Token:", email)

    user = get_user_by_email(db, email)

    print("Database User:", user)
    print("===========================\n")

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user