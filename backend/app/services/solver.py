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


def simulate_flood_frames(
    size: int = 50,
    steps: int = 20,
) -> list[np.ndarray]:
    water = np.zeros((size, size), dtype=float)

    center = size // 2
    water[center, center] = 10.0

    frames = [water.copy()]

    for _ in range(steps):
        new_water = water.copy()

        # Spread water to neighboring cells.
        new_water[1:-1, 1:-1] = (
            water[1:-1, 1:-1] * 0.60
            + water[:-2, 1:-1] * 0.10
            + water[2:, 1:-1] * 0.10
            + water[1:-1, :-2] * 0.10
            + water[1:-1, 2:] * 0.10
        )

        # Prevent tiny numerical values from spreading forever.
        new_water[new_water < 0.001] = 0

        water = new_water

        frames.append(water.copy())

    return frames