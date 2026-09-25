import json

from fastapi import APIRouter

from backend.app.services.database import get_connection

router = APIRouter(prefix="/geo", tags=["Geospatial Data"])


@router.get("/dams")
def get_dams():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    id,
                    name,
                    latitude,
                    longitude,
                    ST_AsGeoJSON(location) AS geometry
                FROM dams
            """)

            rows = cur.fetchall()

    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "id": row[0],
                    "name": row[1],
                    "latitude": row[2],
                    "longitude": row[3],
                },
                "geometry": json.loads(row[4]),
            }
            for row in rows
        ],
    }


@router.get("/rivers")
def get_rivers():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT
                    id,
                    name,
                    ST_AsGeoJSON(geometry) AS geometry
                FROM rivers
            """)

            rows = cur.fetchall()

    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "id": row[0],
                    "name": row[1],
                },
                "geometry": json.loads(row[2]),
            }
            for row in rows
        ],
    }


@router.get("/layers")
def get_layers():
    return {
        "dams": get_dams(),
        "rivers": get_rivers(),
    }