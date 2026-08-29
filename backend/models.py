from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator


class FeedbackCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=160)
    message: str = Field(min_length=5, max_length=2_000)

    @field_validator("name", "subject", "message")
    @classmethod
    def strip_and_require_content(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("This field cannot be blank.")
        return value


class FeedbackOut(BaseModel):
    id: str
    name: str
    subject: str
    message: str
    ai_reply: str | None = None
    created_at: datetime
