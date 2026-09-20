from fastapi import APIRouter

from backend.app.services.terrain.metadata import get_terrain_metadata


router = APIRouter(prefix="/terrain", tags=["Terrain"])


@router.get("/metadata")
def terrain_metadata():
    return get_terrain_metadata()