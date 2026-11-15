from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.models.loader import load_all_models
from app.routers.health import router as health_router
from app.routers.analysis import router as analysis_router
from app.routers.predict import router as predict_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: load all PyTorch + YOLO models once
    load_all_models()
    yield
    # Shutdown: nothing to clean up


app = FastAPI(
    title="DamageVision AI",
    description="AI-powered vehicle damage assessment API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(analysis_router)
app.include_router(predict_router)


@app.get("/")
def root():
    return {"message": "DamageVision AI backend is running. Visit /docs for the API."}