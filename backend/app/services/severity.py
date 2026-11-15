import torch
from PIL import Image

from app.models.registry import model_registry
from app.utils.image_utils import apply_transform
from app.schemas.response import SeverityResult

SEVERITY_CLASSES = ["minor", "moderate", "severe"]


def predict_severity(image: Image.Image) -> SeverityResult:
    device = torch.device(model_registry.device)
    tensor = apply_transform(image).to(device)

    with torch.no_grad():
        outputs = model_registry.severity_model(tensor)
        probs = torch.nn.functional.softmax(outputs, dim=1)
        confidence, pred = torch.max(probs, 1)

    return SeverityResult(
        level=SEVERITY_CLASSES[pred.item()],
        confidence=round(float(confidence.item()), 4)
    )