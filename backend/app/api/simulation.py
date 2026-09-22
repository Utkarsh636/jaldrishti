from fastapi import APIRouter, Query
from backend.app.services.solver import simulate_flood
from backend.app.services.job import create_simulation_job

router = APIRouter(prefix="/simulation", tags=["Simulation"])


@router.post("/queue")
def queue_simulation():
    return create_simulation_job()


@router.post("/run")
def run_simulation(size: int = Query(50, ge=10, le=500)):
    water = simulate_flood(size)

    return {
        "status": "completed",
        "grid_size": size,
        "max_water": float(water.max()),
    }
