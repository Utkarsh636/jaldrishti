from backend.app.services.terrain.validator import validate_terrain_file


def test_supported_terrain_file():
    result = validate_terrain_file("elevation.tif")

    assert result["is_supported"] is True
    assert result["extension"] == ".tif"


def test_unsupported_terrain_file():
    result = validate_terrain_file("notes.txt")

    assert result["is_supported"] is False
    assert result["extension"] == ".txt"