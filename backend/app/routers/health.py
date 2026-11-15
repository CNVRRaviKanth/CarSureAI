from fastapi import APIRouter
from app.models.registry import model_registry
from app.schemas.response import HealthResult

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResult)
def health_check():
    return HealthResult(
        status="ok",
        models_loaded=model_registry.all_loaded,
        device=model_registry.device,
    )