from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(prefix="/api/resume", tags=["resume"])

RESUME_PATH = Path(__file__).resolve().parent.parent / "assets" / "Govind_Singh_Resume.pdf"

@router.get("")
def download_resume():
    if not RESUME_PATH.is_file():
        raise HTTPException(status_code=404, detail="Resume file is unavailable.")

    return FileResponse(
        RESUME_PATH,
        media_type="application/pdf",
        filename="Govind_Singh_Resume.pdf",
    )
