import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.services.ai_service import generate_interview_questions

from app.services.ai_service import (
    generate_interview_questions,
    generate_interview_answer,
    evaluate_interview_answer,
)

router = APIRouter()


class InterviewRequest(BaseModel):
    job_role: str


@router.post("/interview-prep")
def interview_prep(
    data: InterviewRequest,
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

    resume_text = (
        resume.extracted_text
        if resume
        else "No resume uploaded."
    )

    # Create candidate profile
    profile = f"""
Name:
{current_user.name}

Education:
{current_user.education}

Experience:
{current_user.experience}

Skills:
{current_user.skills}

Career Goal:
{current_user.career_goal}

Resume:
{resume_text}
"""

    # Generate interview questions using Gemini
    result = generate_interview_questions(
        profile,
        data.job_role
    )

    return result

class InterviewAnswerRequest(BaseModel):
    question: str


@router.post("/interview-answer")
def interview_answer(
    data: InterviewAnswerRequest,
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

    resume_text = (
        resume.extracted_text
        if resume
        else "No resume uploaded."
    )

    # Create candidate profile
    profile = f"""
Name:
{current_user.name}

Education:
{current_user.education}

Experience:
{current_user.experience}

Skills:
{current_user.skills}

Career Goal:
{current_user.career_goal}

Resume:
{resume_text}
"""

    # Generate AI answer
    result = generate_interview_answer(
        profile,
        data.question
    )

    return result

class MockInterviewRequest(BaseModel):
    question: str
    user_answer: str


@router.post("/mock-interview/evaluate")
def evaluate_mock_interview(
    data: MockInterviewRequest,
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

    resume_text = (
        resume.extracted_text
        if resume
        else "No resume uploaded."
    )

    # Create candidate profile
    profile = f"""
Name:
{current_user.name}

Education:
{current_user.education}

Experience:
{current_user.experience}

Skills:
{current_user.skills}

Career Goal:
{current_user.career_goal}

Resume:
{resume_text}
"""

    # Evaluate candidate's answer
    result = evaluate_interview_answer(
        profile=profile,
        question=data.question,
        user_answer=data.user_answer,
    )

    return result