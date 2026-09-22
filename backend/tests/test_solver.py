from backend.app.services.solver import simulate_flood
from fastapi.testclient import TestClient
from backend.app.main import app
import numpy as np


client = TestClient(app)


def test_simulate_flood():
    result = simulate_flood(20)

    assert isinstance(result, np.ndarray)
    assert result.shape == (20, 20)
    assert result.max() > 0


def test_simulation_api():
    response = client.post("/simulation/run?size=20")

    assert response.status_code == 200
    assert response.json()["status"] == "completed"


def test_invalid_simulation_size():
    response = client.post("/simulation/run?size=5")

    assert response.status_code == 422