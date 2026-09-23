from fastapi import APIRouter, Query
from backend.app.services.solver import (
    simulate_flood,
    simulate_flood_frames,
)

router = APIRouter(prefix="/simulation", tags=["Simulation"])


@router.post("/run")
def run_simulation(size: int = Query(50, ge=10, le=100)):
    water = simulate_flood(size)

    return {
        "status": "completed",
        "grid_size": size,
        "max_water": float(water.max()),
        "water_grid": water.tolist(),
    }


@router.post("/frames")
def run_simulation_frames(
    size: int = Query(50, ge=10, le=100),
    steps: int = Query(20, ge=1, le=100),
):
    frames = simulate_flood_frames(size, steps)

    return {
        "status": "completed",
        "grid_size": size,
        "steps": steps,
        "frames": [
            frame.tolist()
            for frame in frames
        ],
    }
