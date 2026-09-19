from pydantic import BaseModel, Field
from typing import Literal
from uuid import UUID, uuid4


ScenarioStatus = Literal[
    "created",
    "queued",
    "running",
    "completed",
    "failed",
]


class ScenarioCreate(BaseModel):
    name: str = Field(min_length=3, max_length=100)
    dam_id: str
    water_volume: float = Field(gt=0)
    breach_width: float = Field(gt=0)
    breach_time: float = Field(gt=0)
    simulation_duration: float = Field(gt=0)


class Scenario(ScenarioCreate):
    id: UUID = Field(default_factory=uuid4)
    status: ScenarioStatus = "created"
    