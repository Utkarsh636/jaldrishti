from backend.app.services.terrain.metadata import get_terrain_metadata


def test_terrain_metadata():
    result = get_terrain_metadata()

    assert result["status"] == "ready"
    assert "data_directory" in result
    assert "file_count" in result
    assert "files" in result