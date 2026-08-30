import json

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.activity import Activity
from app.utils.pdf_generator import generate_pdf_report

router = APIRouter()


@router.get("/download-report")
def download_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # Get user's saved activity/results
    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .first()
    )

    # Default values
    career_analysis = {}
    ats_score = {}
    job_match = {}

    # Get saved AI results
    if activity:

        # Career Analysis
        if activity.career_analysis:
            try:
                career_analysis = json.loads(
                    activity.career_analysis
                )
            except Exception:
                career_analysis = {}

        # ATS Score
        if activity.ats_score:
            try:
                ats_score = json.loads(
                    activity.ats_score
                )
            except Exception:
                ats_score = {}

        # Job Match
        if activity.job_match:
            try:
                job_match = json.loads(
                    activity.job_match
                )
            except Exception:
                job_match = {}

    # Generate PDF
    pdf_path = generate_pdf_report(
        filename=f"{current_user.name}_AI_Report.pdf",
        user_name=current_user.name,
        career_analysis=career_analysis,
        ats_score=ats_score,
        job_match=job_match,
    )

    return FileResponse(
        path=pdf_path,
        filename=f"{current_user.name}_AI_Report.pdf",
        media_type="application/pdf",
    )