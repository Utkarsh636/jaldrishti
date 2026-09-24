import numpy as np


def assess_impact(water_grid: np.ndarray) -> dict:
    impacted_cells = int(np.sum(water_grid > 0.1))
    max_depth = float(water_grid.max())

    return {
        "impacted_cells": impacted_cells,
        "max_depth": max_depth,
        "flood_detected": impacted_cells > 0,
    }