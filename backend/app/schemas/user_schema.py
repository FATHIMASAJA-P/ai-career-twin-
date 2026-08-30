from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserProfileUpdate(BaseModel):
    career_goal: str | None = None
    education: str | None = None
    experience: str | None = None
    skills: str | None = None
    github: str | None = None
    linkedin: str | None = None