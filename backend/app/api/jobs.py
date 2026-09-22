from fastapi import APIRouter
from backend.app.services.job import create_simulation_job

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.post("/")
def create_job():
    return create_simulation_job()