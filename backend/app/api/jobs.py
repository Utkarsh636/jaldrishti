from fastapi import APIRouter, HTTPException
from backend.app.services.job import create_simulation_job, get_job

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.post("/")
def create_job():
    return create_simulation_job()


@router.get("/{job_id}")
def job_status(job_id: str):
    job = get_job(job_id)

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    return job