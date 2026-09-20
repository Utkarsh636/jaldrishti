from pathlib import Path


TERRAIN_DATA_DIR = Path("data/terrain")

SUPPORTED_TERRAIN_FORMATS = [
    ".tif",
    ".tiff",
    ".asc",
]


def get_supported_formats() -> list[str]:
    return SUPPORTED_TERRAIN_FORMATS