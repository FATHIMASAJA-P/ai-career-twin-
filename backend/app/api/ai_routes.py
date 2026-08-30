from app.models.history import History
from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session
import json

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.activity import Activity
from app.models.resume import Resume
from app.models.user import User
from app.services.ai_service import generate_career_analysis

router = APIRouter()


@router.post("/career-analysis")
def career_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Get the latest uploaded resume of the logged-in user
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    # If no resume is uploaded
    if resume:
        resume_text = resume.extracted_text
    else:
        resume_text = "No resume uploaded."

    # Create profile for Gemini
    profile = f"""
Name: {current_user.name}

Education: {current_user.education}

Experience: {current_user.experience}

Skills: {current_user.skills}

Career Goal: {current_user.career_goal}

GitHub: {current_user.github}

LinkedIn: {current_user.linkedin}

Resume Content:
--------------------------------------------------
{resume_text}
--------------------------------------------------
"""

    result = generate_career_analysis(profile)
    history = History(
        user_id=current_user.id,
        analysis_type="career_analysis",
        result=json.dumps(result)
    )

    db.add(history)
    db.commit()

    # Mark Career Analysis as completed
    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    if not activity:
        activity = Activity(
           user_id=current_user.id,
           career_analysis_done=True,
           career_analysis=json.dumps(result)
    )
        db.add(activity)
    else:
        activity.career_analysis_done = True
        activity.career_analysis = json.dumps(result)

    db.commit()

    return {
        "message": "Career analysis generated successfully",
        "analysis": result,
    }

