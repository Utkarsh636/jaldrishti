from fastapi import APIRouter

from backend.app.services.geo_data import DEMO_DAMS, DEMO_RIVERS

router = APIRouter(prefix="/geo", tags=["Geospatial Data"])


@router.get("/dams")
def get_dams():
    return DEMO_DAMS


@router.get("/rivers")
def get_rivers():
    return DEMO_RIVERS