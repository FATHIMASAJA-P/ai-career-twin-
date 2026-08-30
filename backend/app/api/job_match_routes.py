from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.activity import Activity

from app.schemas.job_match_schema import JobMatchRequest
from app.services.ai_service import generate_job_match


router = APIRouter()


@router.post("/job-match")
def job_match(
    request: JobMatchRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get latest uploaded resume
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    # If no resume is uploaded
    if not resume:
        return {
            "message": "No resume found. Please upload your resume first."
        }

    # Generate AI job match
    result = generate_job_match(
        resume.extracted_text,
        request.job_description
    )

    # -----------------------------
    # Mark Job Match as completed
    # -----------------------------

    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    if not activity:
        activity = Activity(
            user_id=current_user.id,
            job_match_done=True,
            job_match=json.dumps(result)
        )

        db.add(activity)

    else:
        activity.job_match_done = True
        activity.job_match = json.dumps(result)

    db.commit()

    return {
        "message": "Job match analysis generated successfully",
        "analysis": result
    }