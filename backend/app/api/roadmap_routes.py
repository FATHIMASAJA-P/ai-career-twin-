import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.models.activity import Activity
from app.services.ai_service import generate_career_roadmap
from pydantic import BaseModel

router = APIRouter()
class RoadmapUpdate(BaseModel):
    step: str
    status: str


@router.get("/career-roadmap")
def career_roadmap(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Get latest resume
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    resume_text = resume.extracted_text if resume else "No resume uploaded."

    # Create profile for Gemini
    profile = f"""
Name: {current_user.name}

Education: {current_user.education}

Experience: {current_user.experience}

Skills: {current_user.skills}

Career Goal: {current_user.career_goal}

Resume:
{resume_text}
"""

    # Generate AI roadmap
    roadmap = generate_career_roadmap(profile)

    # Find user's activity
    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    # Create activity if it doesn't exist
    if not activity:
        activity = Activity(user_id=current_user.id)
        db.add(activity)

    # Save roadmap in database
    activity.career_roadmap = json.dumps(roadmap)

    db.commit()

    return roadmap


@router.put("/career-roadmap")
def update_career_roadmap(
    data: RoadmapUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    if not activity or not activity.career_roadmap:
        return {"message": "Career roadmap not found"}

    roadmap = json.loads(activity.career_roadmap)

    for item in roadmap:
        if item["step"] == data.step:
            item["status"] = data.status
            break

    activity.career_roadmap = json.dumps(roadmap)

    db.commit()

    return {
        "message": "Roadmap updated successfully",
        "roadmap": roadmap
    }