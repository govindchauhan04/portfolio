import os

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/code", tags=["code-runner"])

RAPIDAPI_JUDGE0_KEY = os.getenv("RAPIDAPI_JUDGE0_KEY")
JUDGE0_URL = os.getenv(
    "JUDGE0_URL",
    "https://judge0-ce.p.rapidapi.com" if RAPIDAPI_JUDGE0_KEY else "http://localhost:2358",
).rstrip("/")
LANGUAGE_IDS = {"c": 50, "cpp": 54, "java": 62, "python": 71, "javascript": 63}


class CodeRequest(BaseModel):
    language: str
    source_code: str = Field(min_length=1, max_length=50_000)
    stdin: str = Field(default="", max_length=10_000)


@router.post("/run")
async def run_code(payload: CodeRequest):
    language_id = LANGUAGE_IDS.get(payload.language)
    if language_id is None:
        raise HTTPException(status_code=400, detail="Choose C, C++, Java, Python, or JavaScript.")

    request_data = {
        "language_id": language_id,
        "source_code": payload.source_code,
        "stdin": payload.stdin,
        "cpu_time_limit": 3,
        "wall_time_limit": 5,
        "memory_limit": 128000,
    }
    headers = {}
    if RAPIDAPI_JUDGE0_KEY:
        headers = {
            "X-RapidAPI-Key": RAPIDAPI_JUDGE0_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        }
    try:
        async with httpx.AsyncClient(timeout=12) as client:
            response = await client.post(
                f"{JUDGE0_URL}/submissions?base64_encoded=false&wait=true",
                json=request_data,
                headers=headers,
            )
            response.raise_for_status()
    except httpx.HTTPError as error:
        raise HTTPException(status_code=503, detail="Compiler service is unavailable. Check the RapidAPI Judge0 subscription and API key.") from error

    result = response.json()
    output = "".join(filter(None, [result.get("compile_output"), result.get("stderr"), result.get("stdout")] )).strip()
    if not output:
        output = result.get("status", {}).get("description", "Program finished.")
    return {"output": output}
