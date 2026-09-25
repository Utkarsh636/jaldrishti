from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.geo import router as geo_router
from backend.app.api.database import router as database_router
from backend.app.api.impact import router as impact_router
from backend.app.api.jobs import router as jobs_router
from backend.app.api.scenarios import router as scenarios_router
from backend.app.api.simulation import router as simulation_router
from backend.app.api.terrain import router as terrain_router

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

app.include_router(scenarios_router)
app.include_router(database_router)
app.include_router(geo_router)
app.include_router(impact_router)
app.include_router(jobs_router)
app.include_router(simulation_router)
app.include_router(terrain_router)


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
