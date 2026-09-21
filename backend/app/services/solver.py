import numpy as np


def simulate_flood(size: int = 50) -> np.ndarray:
    water = np.zeros((size, size))
    water[size // 2, size // 2] = 10

    for _ in range(20):
        water = (water + np.roll(water, 1, axis=0)
                 + np.roll(water, -1, axis=0)
                 + np.roll(water, 1, axis=1)
                 + np.roll(water, -1, axis=1)) / 5

    return water