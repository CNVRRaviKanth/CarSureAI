from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pipeline import run_pipeline
from app.utils.image_utils import bytes_to_pil
from app.schemas.response import AnalysisResult

router = APIRouter(tags=["Analysis"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp"}


@router.post("/analyze", response_model=AnalysisResult)
async def analyze(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type: {file.content_type}. Use JPEG or PNG."
        )

    data = await file.read()
    if len(data) > 10 * 1024 * 1024:   # 10 MB guard
        raise HTTPException(status_code=413, detail="File too large. Max 10 MB.")

    try:
        image = bytes_to_pil(data)
        result = run_pipeline(image)
        return result
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(exc)}")