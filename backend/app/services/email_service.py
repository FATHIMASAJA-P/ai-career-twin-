import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.config import (
    SMTP_EMAIL,
    SMTP_APP_PASSWORD,
)


def send_reset_email(
    recipient_email: str,
    reset_link: str,
):
    subject = "AI Career Twin - Reset Your Password"

    body = f"""
Hello,

We received a request to reset your AI Career Twin password.

Click the link below to create a new password:

{reset_link}

This link will expire in 30 minutes.

If you did not request a password reset, you can safely ignore this email.

Regards,
AI Career Twin
"""

    message = MIMEMultipart()

    message["From"] = SMTP_EMAIL
    message["To"] = recipient_email
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    with smtplib.SMTP(
        "smtp.gmail.com",
        587
    ) as server:

        server.starttls()

        server.login(
            SMTP_EMAIL,
            SMTP_APP_PASSWORD
        )

        server.sendmail(
            SMTP_EMAIL,
            recipient_email,
            message.as_string()
        )