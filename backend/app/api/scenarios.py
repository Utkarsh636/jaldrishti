from fastapi import APIRouter, HTTPException

from backend.app.schemas.scenario import (
    Scenario,
    ScenarioCreate,
)

router = APIRouter(
    prefix="/scenarios",
    tags=["Scenarios"],
)

scenarios: list[Scenario] = []


@router.post("/", response_model=Scenario)
def create_scenario(data: ScenarioCreate):
    scenario = Scenario(**data.model_dump())
    scenarios.append(scenario)
    return scenario


@router.get("/", response_model=list[Scenario])
def get_scenarios():
    return scenarios


@router.get("/{scenario_id}", response_model=Scenario)
def get_scenario(scenario_id: str):
    for scenario in scenarios:
        if str(scenario.id) == scenario_id:
            return scenario

    raise HTTPException(
        status_code=404,
        detail="Scenario not found",
    )