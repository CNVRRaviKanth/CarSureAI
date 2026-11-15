import torch
from PIL import Image

from app.models.registry import model_registry
from app.utils.image_utils import apply_transform
from app.schemas.response import ClassificationResult

# Index 0 = "00-damage", index 1 = "01-whole"
CLASS_NAMES = ["00-damage", "01-whole"]


def classify_damage(image: Image.Image) -> ClassificationResult:
    device = torch.device(model_registry.device)
    tensor = apply_transform(image).to(device)

    with torch.no_grad():
        outputs = model_registry.classification_model(tensor)
        probs = torch.nn.functional.softmax(outputs, dim=1)
        confidence, pred = torch.max(probs, 1)

    raw_label = CLASS_NAMES[pred.item()]
    label = "no_damage" if raw_label == "01-whole" else "damaged"

    return ClassificationResult(
        label=label,
        confidence=round(float(confidence.item()), 4)
    )