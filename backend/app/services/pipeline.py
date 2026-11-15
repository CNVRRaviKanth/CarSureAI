from PIL import Image

from app.services.classifier import classify_damage
from app.services.detector import detect_damage
from app.services.severity import predict_severity
from app.utils.image_utils import crop_largest_box
from app.models.registry import model_registry
from app.schemas.response import AnalysisResult


def run_pipeline(image: Image.Image) -> AnalysisResult:
    # ── Module 1: Damage Classification ──────────────────────────────
    classification = classify_damage(image)
    has_damage = classification.label == "damaged"

    if not has_damage:
        return AnalysisResult(
            has_damage=False,
            classification=classification,
            message="No damage detected. Vehicle appears to be in good condition.",
        )

    # ── Module 2: Damage Localisation ────────────────────────────────
    localization = detect_damage(image)

    if localization.boxes_count == 0:
        return AnalysisResult(
            has_damage=True,
            classification=classification,
            localization=localization,
            message="Damage detected but could not localise a specific region.",
        )

    # ── Module 3: Severity Prediction (on cropped region) ───────────
    # Re-run YOLO to get boxes object for cropping
    raw_results = model_registry.yolo_model(image, conf=0.3)
    cropped_image = crop_largest_box(image, raw_results[0].boxes)

    severity = None
    if cropped_image:
        severity = predict_severity(cropped_image)

    level = severity.level.upper() if severity else "UNKNOWN"
    return AnalysisResult(
        has_damage=True,
        classification=classification,
        localization=localization,
        severity=severity,
        message=f"Damage detected. Severity assessed as {level}.",
    )