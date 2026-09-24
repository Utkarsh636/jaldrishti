import numpy as np

from backend.app.services.impact.assessment import assess_impact


def test_assess_impact():
    water = np.zeros((10, 10))
    water[4:6, 4:6] = 2.0

    result = assess_impact(water)

    assert result["impacted_cells"] == 4
    assert result["max_depth"] == 2.0
    assert result["flood_detected"] is True


def test_no_flood():
    water = np.zeros((10, 10))

    result = assess_impact(water)

    assert result["impacted_cells"] == 0
    assert result["max_depth"] == 0.0
    assert result["flood_detected"] is False