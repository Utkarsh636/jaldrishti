from fastapi import APIRouter

from backend.app.services.database import get_connection

router = APIRouter(prefix="/database", tags=["Database"])


@router.get("/health")
def database_health():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    version(),
                    PostGIS_Version()
            """)

            postgres_version, postgis_version = cur.fetchone()

    return {
        "status": "healthy",
        "postgres": postgres_version.split(" ")[1],
        "postgis": postgis_version,
    }