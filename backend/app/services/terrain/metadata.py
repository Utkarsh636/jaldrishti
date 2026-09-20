from pathlib import Path


TERRAIN_DATA_DIR = Path("data/terrain")


def get_terrain_metadata() -> dict:
    terrain_files = list(TERRAIN_DATA_DIR.glob("*"))

    return {
        "status": "ready",
        "data_directory": str(TERRAIN_DATA_DIR),
        "file_count": len(terrain_files),
        "files": [file.name for file in terrain_files],
    }