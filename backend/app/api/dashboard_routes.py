from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.activity import Activity


router = APIRouter()


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check profile completion
    profile_completed = all([
        current_user.career_goal,
        current_user.education,
        current_user.experience,
        current_user.skills,
        current_user.github,
        current_user.linkedin,
    ])

    # Check resume upload
    resume_uploaded = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .first()
        is not None
    )

    # Get user's activity
    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    # Default activity status
    career_analysis_completed = False
    job_match_completed = False
    ats_completed = False

    # Career roadmap defaults
    roadmap = []
    roadmap_completed = 0
    roadmap_total = 0
    roadmap_progress = 0

    if activity:

        career_analysis_completed = activity.career_analysis_done
        job_match_completed = activity.job_match_done
        ats_completed = activity.ats_done

        # Get saved career roadmap
        if activity.career_roadmap:
            try:
                roadmap = json.loads(activity.career_roadmap)

                roadmap_total = len(roadmap)

                roadmap_completed = sum(
                    1
                    for item in roadmap
                    if item.get("status") == "Completed"
                )

                if roadmap_total > 0:
                    roadmap_progress = round(
                        (roadmap_completed / roadmap_total) * 100
                    )

            except Exception as e:
                print("Roadmap Error:", e)

    # Calculate main dashboard progress
    progress = 0

    if resume_uploaded:
        progress += 25

    if career_analysis_completed:
        progress += 25

    if job_match_completed:
        progress += 25

    if ats_completed:
        progress += 25

    return {
        "profile_completed": profile_completed,

        "resume_uploaded": resume_uploaded,

        "career_analysis_completed": career_analysis_completed,

        "job_match_completed": job_match_completed,

        "ats_completed": ats_completed,

        "progress": progress,

        # Career Roadmap
        "roadmap_completed": roadmap_completed,
        "roadmap_total": roadmap_total,
        "roadmap_progress": roadmap_progress,
    }