from backend.app.services.database import get_connection


def test_database_connection():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT 1")
            result = cur.fetchone()

    assert result == (1,)


def test_postgis_available():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT PostGIS_Version()")
            result = cur.fetchone()

    assert result is not None
    assert result[0].startswith("3.")