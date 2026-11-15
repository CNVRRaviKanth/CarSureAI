import base64
import io
import numpy as np
from PIL import Image


def pil_to_base64(image: Image.Image, fmt: str = "PNG") -> str:
    """Encode a PIL image as a base64 string (data-URI ready)."""
    buffer = io.BytesIO()
    image.save(buffer, format=fmt)
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/{fmt.lower()};base64,{encoded}"


def numpy_to_base64(arr: np.ndarray, fmt: str = "PNG") -> str:
    """Encode a NumPy BGR array (as returned by YOLO .plot()) as base64."""
    # YOLO .plot() returns BGR; convert to RGB for correct colours
    rgb = arr[:, :, ::-1]
    image = Image.fromarray(rgb)
    return pil_to_base64(image, fmt)