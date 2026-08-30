from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.schemas.user_schema import UserProfileUpdate

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()




def create_user(db: Session, name: str, email: str, password: str):
    user = User(
        name=name,
        email=email,
        password=hash_password(password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def update_user_profile(db: Session, user: User, profile: UserProfileUpdate):
    user.career_goal = profile.career_goal
    user.education = profile.education
    user.experience = profile.experience
    user.skills = profile.skills
    user.github = profile.github
    user.linkedin = profile.linkedin

    db.commit()
    db.refresh(user)

    return user