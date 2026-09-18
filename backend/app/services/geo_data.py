DEMO_DAMS = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "demo-dam-001",
                "name": "Demo Dam",
                "status": "prototype",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [78.0322, 30.3165],
            },
        }
    ],
}

DEMO_RIVERS = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "demo-river-001",
                "name": "Demo River",
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [77.90, 30.45],
                    [78.0322, 30.3165],
                    [78.15, 30.20],
                    [78.28, 30.10],
                ],
            },
        }
    ],
}