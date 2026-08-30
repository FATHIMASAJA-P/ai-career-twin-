from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(String, nullable=False)

    career_goal = Column(String)

    education = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    skills = Column(String, nullable=True)
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)

    # Forgot Password
    reset_token = Column(
        String,
        nullable=True
    )

    reset_token_expires = Column(
        DateTime,
        nullable=True
    )

    # Relationship with Resume table
    resumes = relationship(
        "Resume",
        back_populates="user"
    )