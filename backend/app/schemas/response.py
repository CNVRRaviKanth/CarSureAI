from pydantic import BaseModel
from typing import Optional


class ClassificationResult(BaseModel):
    label: str          # "damaged" | "no_damage"
    confidence: float   # 0.0 – 1.0


class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float


class LocalizationResult(BaseModel):
    boxes_count: int
    boxes: list[BoundingBox]
    annotated_image: Optional[str] = None   # base64 PNG
    cropped_image: Optional[str] = None     # base64 PNG


class SeverityResult(BaseModel):
    level: str          # "minor" | "moderate" | "severe"
    confidence: float   # 0.0 – 1.0


class AnalysisResult(BaseModel):
    has_damage: bool
    classification: ClassificationResult
    localization: Optional[LocalizationResult] = None
    severity: Optional[SeverityResult] = None
    message: str = ""


class HealthResult(BaseModel):
    status: str
    models_loaded: bool
    device: str