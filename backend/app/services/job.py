jobs = {}


def create_simulation_job() -> dict:
    from uuid import uuid4

    job_id = str(uuid4())

    job = {
        "job_id": job_id,
        "status": "queued",
    }

    jobs[job_id] = job
    return job


def get_job(job_id: str) -> dict | None:
    return jobs.get(job_id)