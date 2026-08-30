from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.activity import Activity

from app.services.ai_service import generate_ats_score


router = APIRouter()


@router.post("/ats-score")
def ats_score(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Get latest uploaded resume
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    # If no resume
    if not resume:
        return {
            "message": "No resume uploaded. Please upload your resume first."
        }

    # Generate ATS score
    result = generate_ats_score(resume.extracted_text)

    # -----------------------------
    # Mark ATS Score as completed
    # -----------------------------

    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    if not activity:
        activity = Activity(
            user_id=current_user.id,
            ats_done=True,
            ats_score=json.dumps(result)
        )

        db.add(activity)

    else:
        activity.ats_done = True
        activity.ats_score = json.dumps(result)

    db.commit()

    return {
        "message": "ATS Score Generated",
        "analysis": result
    }