from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.classifier import classify_damage
from app.services.detector import detect_damage
from app.services.severity import predict_severity
from app.utils.image_utils import bytes_to_pil
from app.schemas.response import ClassificationResult, LocalizationResult, SeverityResult

router = APIRouter(prefix="/predict", tags=["Predict"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg", "image/webp"}


def _read_image(file: UploadFile, data: bytes):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=415, detail="Unsupported file type.")
    return bytes_to_pil(data)


@router.post("/classify", response_model=ClassificationResult)
async def predict_classify(file: UploadFile = File(...)):
    data = await file.read()
    image = _read_image(file, data)
    return classify_damage(image)


@router.post("/detect", response_model=LocalizationResult)
async def predict_detect(file: UploadFile = File(...)):
    data = await file.read()
    image = _read_image(file, data)
    return detect_damage(image)


@router.post("/severity", response_model=SeverityResult)
async def predict_severity_endpoint(file: UploadFile = File(...)):
    data = await file.read()
    image = _read_image(file, data)
    return predict_severity(image)