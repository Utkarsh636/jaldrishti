from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.geo import router as geo_router

app = FastAPI(
    title="JALDRISHTI API",
    description="Dam-Break Inundation Intelligence System",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(geo_router)


@app.get("/")
def root():
    return {
        "project": "JALDRISHTI",
        "status": "online",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "jaldrishti-api",
    }
