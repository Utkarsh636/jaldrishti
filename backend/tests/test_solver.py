from backend.app.services.solver import simulate_flood
import numpy as np


def test_simulate_flood():
    result = simulate_flood(20)

    assert isinstance(result, np.ndarray)
    assert result.shape == (20, 20)
    assert result.max() > 0