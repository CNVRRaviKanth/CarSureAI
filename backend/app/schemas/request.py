from pydantic import BaseModel

class ImageUploadRequest(BaseModel):
    """
    Placeholder schema for future JSON-based requests.
    The actual upload uses FastAPI's UploadFile (multipart/form-data),
    so this file is reserved for any extended request metadata.
    """
    pass