from uuid import uuid4


def create_simulation_job() -> dict:
    return {
        "job_id": str(uuid4()),
        "status": "queued",
    }