import numpy as np
from fastapi import APIRouter

from backend.app.services.impact.assessment import assess_impact
from backend.app.services.solver import simulate_flood

router = APIRouter(prefix="/impact", tags=["Impact"])


@router.post("/assess")
def assess_simulation_impact(size: int = 50):
    water = simulate_flood(size)
    impact = assess_impact(water)

    return {
        "status": "completed",
        "grid_size": size,
        "impact": impact,
    }