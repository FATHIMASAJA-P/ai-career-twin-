from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.database import add_missing_columns, engine

# Models
from app.models.user import User
from app.models.activity import Activity
from app.models.resume import Resume

# Routers
from app.api.user_routes import router as user_router
from app.api.auth_routes import router as auth_router
from app.api.resume_routes import router as resume_router
from app.api.ai_routes import router as ai_router
from app.api.job_match_routes import router as job_match_router
from app.api import ats_routes
from app.api.dashboard_routes import router as dashboard_router
from app.api.report_routes import router as report_router
from app.models.history import History
from app.api.history_routes import router as history_router

from app.api import roadmap_routes
from app.api import interview_routes
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# -------------------- CORS --------------------

import os

origins = [
    "http://localhost:5173",
]

frontend_url = os.getenv("FRONTEND_URL")

if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------- DATABASE --------------------

Base.metadata.create_all(bind=engine)
add_missing_columns()


# -------------------- ROUTERS --------------------

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(ai_router)
app.include_router(job_match_router)
app.include_router(ats_routes.router)
app.include_router(dashboard_router)
app.include_router(report_router)
app.include_router(history_router)
app.include_router(roadmap_routes.router)
app.include_router(interview_routes.router)


# -------------------- HOME --------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Twin 🚀"
    }