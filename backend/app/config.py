import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

SMTP_EMAIL = os.getenv("SMTP_EMAIL")

SMTP_APP_PASSWORD = os.getenv("SMTP_APP_PASSWORD")

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)