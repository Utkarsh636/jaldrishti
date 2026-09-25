import numpy as np


IMPACT_DEPTH_THRESHOLD = 0.1


def assess_impact(water_grid: np.ndarray) -> dict:
    impacted_cells = int(
        np.sum(water_grid > IMPACT_DEPTH_THRESHOLD)
    )

    max_depth = float(water_grid.max())

    low_cells = int(np.sum(
        (water_grid > 0.1) & (water_grid <= 0.5)
    ))

    medium_cells = int(np.sum(
        (water_grid > 0.5) & (water_grid <= 1.5)
    ))

    high_cells = int(np.sum(water_grid > 1.5))

    return {
        "impacted_cells": impacted_cells,
        "max_depth": max_depth,
        "flood_detected": impacted_cells > 0,
        "depth_threshold": IMPACT_DEPTH_THRESHOLD,
        "severity": {
            "low": low_cells,
            "medium": medium_cells,
            "high": high_cells,
        },
    }
