import os
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
from fastapi import APIRouter, BackgroundTasks, HTTPException, status
from pymongo.errors import PyMongoError

from database import feedback_collection
from models import FeedbackCreate, FeedbackOut

router = APIRouter(prefix="/api/feedback", tags=["feedback"])

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def generate_ai_reply(message: str) -> str:
    """Generate a short thank-you reply with Groq if a key is configured,
    otherwise fall back to a static message."""
    if not GROQ_API_KEY:
        return "Thanks for the feedback — it means a lot!"

    try:
        from groq import Groq

        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": "You reply to portfolio-site feedback in 1-2 warm, short sentences.",
                },
                {"role": "user", "content": message},
            ],
            max_tokens=60,
        )
        return completion.choices[0].message.content.strip()
    except Exception:
        return "Thanks for the feedback — it means a lot!"


def send_email_notifications(name: str, email: str, subject: str, message: str) -> None:
    """Notify the owner and confirm receipt to the visitor in the background."""
    if not EMAIL_USER or not EMAIL_PASS:
        print("[email] SKIPPED — EMAIL_USER or EMAIL_PASS not set in .env")
        return

    print(f"[email] attempting to send from {EMAIL_USER}...")
    try:
        owner_body = (
            f"You got new feedback on your portfolio!\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject}\n"
            f"Message: {message}\n"
            f"Time: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}"
        )
        visitor_body = (
            f"Hi {name},\n\n"
            "Thanks for sharing feedback on Govind Singh's portfolio. "
            "Your message has been received.\n\n"
            "Regards,\nGovind Singh"
        )

        owner_message = MIMEText(owner_body)
        owner_message["Subject"] = "New portfolio feedback"
        owner_message["From"] = EMAIL_USER
        owner_message["To"] = EMAIL_USER

        visitor_message = MIMEText(visitor_body)
        visitor_message["Subject"] = "Thanks for your portfolio feedback"
        visitor_message["From"] = EMAIL_USER
        visitor_message["To"] = email

        # timeout=10 added — connection will fail fast instead of hanging forever
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, [EMAIL_USER], owner_message.as_string())
            server.sendmail(EMAIL_USER, [email], visitor_message.as_string())
        print("[email] notifications sent successfully")
    except Exception as e:
        print(f"[email] FAILED to send notification: {e}")


def serialize(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "subject": doc["subject"],
        "message": doc["message"],
        "ai_reply": doc.get("ai_reply"),
        "created_at": doc["created_at"],
    }


@router.post("", response_model=FeedbackOut)
def create_feedback(payload: FeedbackCreate, background_tasks: BackgroundTasks):
    ai_reply = generate_ai_reply(payload.message)
    doc = {
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "ai_reply": ai_reply,
        "created_at": datetime.utcnow(),
    }
    try:
        result = feedback_collection.insert_one(doc)
    except PyMongoError as exc:
        print(f"[feedback] database error: {exc}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Feedback is temporarily unavailable. Please try again later.",
        ) from exc
    doc["_id"] = result.inserted_id

    # Email delivery must not delay or break a successful submission.
    background_tasks.add_task(send_email_notifications, payload.name, payload.email, payload.subject, payload.message)

    return serialize(doc)
