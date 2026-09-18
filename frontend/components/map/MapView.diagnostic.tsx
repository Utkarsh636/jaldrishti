
"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: [78.0322, 30.3165],
      zoom: 10,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      console.log("MAP LOADED SUCCESSFULLY");

      // Visible HTML marker
      const markerElement = document.createElement("div");
      markerElement.style.width = "40px";
      markerElement.style.height = "40px";
      markerElement.style.backgroundColor = "red";
      markerElement.style.border = "4px solid white";
      markerElement.style.borderRadius = "50%";
      markerElement.style.boxShadow = "0 0 10px black";

      new maplibregl.Marker({ element: markerElement })
        .setLngLat([78.0322, 30.3165])
        .addTo(map);

      // Visible cyan line
      map.addSource("diagnostic-line", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [77.98, 30.36],
              [78.0322, 30.3165],
              [78.08, 30.27],
            ],
          },
        },
      });

      map.addLayer({
        id: "diagnostic-line-layer",
        type: "line",
        source: "diagnostic-line",
        paint: {
          "line-color": "#00ffff",
          "line-width": 12,
        },
      });

      console.log("DIAGNOSTIC MARKER AND LINE ADDED");
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: "500px", width: "100%" }}
    />
  );
}