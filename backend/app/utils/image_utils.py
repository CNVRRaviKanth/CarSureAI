from PIL import Image
import io
from torchvision import transforms


# Standard ImageNet transform used by all CNN models
image_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def bytes_to_pil(data: bytes) -> Image.Image:
    """Convert raw upload bytes to a PIL RGB image."""
    return Image.open(io.BytesIO(data)).convert("RGB")


def apply_transform(image: Image.Image):
    """Apply ImageNet normalisation and return a 4-D tensor (1, C, H, W)."""
    return image_transform(image).unsqueeze(0)


def crop_largest_box(image: Image.Image, boxes) -> Image.Image | None:
    """
    Given a list of YOLO boxes (ultralytics Results.boxes),
    crop and return the region with the largest area.
    Returns None if no boxes supplied.
    """
    if boxes is None or len(boxes) == 0:
        return None

    w, h = image.size
    best_box = None
    largest_area = 0.0

    for box in boxes:
        coords = box.xyxy[0].cpu().numpy()
        x1, y1, x2, y2 = coords
        area = (x2 - x1) * (y2 - y1)
        if area > largest_area:
            largest_area = area
            best_box = coords

    if best_box is None:
        return None

    x1, y1, x2, y2 = best_box
    x1, y1 = max(0, int(x1)), max(0, int(y1))
    x2, y2 = min(w, int(x2)), min(h, int(y2))
    return image.crop((x1, y1, x2, y2))