from PIL import Image

from app.models.registry import model_registry
from app.utils.image_utils import crop_largest_box
from app.utils.encode_utils import numpy_to_base64, pil_to_base64
from app.schemas.response import LocalizationResult, BoundingBox


def detect_damage(image: Image.Image) -> LocalizationResult:
    results = model_registry.yolo_model(image, conf=0.3)
    boxes_raw = results[0].boxes

    if boxes_raw is None or len(boxes_raw) == 0:
        return LocalizationResult(boxes_count=0, boxes=[])

    # Annotated image (YOLO draws the bboxes)
    plotted = results[0].plot()
    annotated_b64 = numpy_to_base64(plotted)

    # Structured box list
    box_list: list[BoundingBox] = []
    for box in boxes_raw:
        coords = box.xyxy[0].cpu().numpy()
        conf = float(box.conf[0].cpu().numpy())
        box_list.append(BoundingBox(
            x1=round(float(coords[0]), 2),
            y1=round(float(coords[1]), 2),
            x2=round(float(coords[2]), 2),
            y2=round(float(coords[3]), 2),
            confidence=round(conf, 4),
        ))

    # Crop largest region
    cropped = crop_largest_box(image, boxes_raw)
    cropped_b64 = pil_to_base64(cropped) if cropped else None

    return LocalizationResult(
        boxes_count=len(box_list),
        boxes=box_list,
        annotated_image=annotated_b64,
        cropped_image=cropped_b64,
    )