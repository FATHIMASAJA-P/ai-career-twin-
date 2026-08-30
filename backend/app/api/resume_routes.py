from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

from app.database.database import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.services.resume_service import extract_text_from_pdf

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    if file.content_type != "application/pdf":
        return {"message": "Only PDF files are allowed."}

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)

    resume = Resume(
        filename=file.filename,
        file_path=file_path,
        extracted_text=text,
        user_id=current_user.id
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "filename": file.filename
    }