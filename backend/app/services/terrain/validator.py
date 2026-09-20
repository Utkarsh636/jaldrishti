from pathlib import Path

from backend.app.services.terrain.config import (
    SUPPORTED_TERRAIN_FORMATS,
)


def validate_terrain_file(file_path: str) -> dict:
    path = Path(file_path)

    is_supported = (
        path.suffix.lower() in SUPPORTED_TERRAIN_FORMATS
    )

    return {
        "filename": path.name,
        "extension": path.suffix.lower(),
        "is_supported": is_supported,
    }