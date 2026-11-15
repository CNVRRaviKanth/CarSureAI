import os
from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Model paths (relative to backend folder)
    MODEL_DIR: str = "../models"
    CLS_MODEL_NAME: str = "best_binary_model.pth"
    YOLO_MODEL_NAME: str = "damage_location.pt"
    SEV_MODEL_NAME: str = "damage_severity.pth"

    # Server
    PORT: int = 8000
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    # Device: "cpu", "cuda", or "mps"
    DEVICE: str = "cpu"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def cls_model_path(self) -> Path:
        return Path(self.MODEL_DIR) / self.CLS_MODEL_NAME

    @property
    def yolo_model_path(self) -> Path:
        return Path(self.MODEL_DIR) / self.YOLO_MODEL_NAME

    @property
    def sev_model_path(self) -> Path:
        return Path(self.MODEL_DIR) / self.SEV_MODEL_NAME


settings = Settings()