
"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const container = mapContainer.current;

    const map = new maplibregl.Map({
      container,
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

    map.on("load", async () => {
      try {
        const [damsResponse, riversResponse] = await Promise.all([
          fetch("http://localhost:8000/geo/dams"),
          fetch("http://localhost:8000/geo/rivers"),
        ]);

        const dams = await damsResponse.json();
        const rivers = await riversResponse.json();

        // Dam markers
        for (const feature of dams.features) {
          const markerElement = document.createElement("div");

          markerElement.style.width = "32px";
          markerElement.style.height = "32px";
          markerElement.style.backgroundColor = "#ff0000";
          markerElement.style.border = "4px solid white";
          markerElement.style.borderRadius = "50%";
          markerElement.style.boxShadow = "0 0 12px black";

          new maplibregl.Marker({ element: markerElement })
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
              new maplibregl.Popup().setHTML(
                `<strong>${feature.properties.name}</strong>
                 <br />Status: ${feature.properties.status}`
              )
            )
            .addTo(map);
        }

        // SVG river overlay
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );

        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.zIndex = "10";
        svg.style.pointerEvents = "none";

        const riverLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polyline"
        );

        riverLine.setAttribute("fill", "none");
        riverLine.setAttribute("stroke", "#ff00ff");
        riverLine.setAttribute("stroke-width", "12");
        riverLine.setAttribute("stroke-linecap", "round");
        riverLine.setAttribute("stroke-linejoin", "round");

        svg.appendChild(riverLine);
        container.appendChild(svg);

        const coordinates = rivers.features[0].geometry.coordinates;

        const updateRiver = () => {
          const points = coordinates
            .map((coordinate: [number, number]) => {
              const point = map.project(coordinate);
              return `${point.x},${point.y}`;
            })
            .join(" ");

          riverLine.setAttribute("points", points);
        };

        updateRiver();

        map.on("move", updateRiver);
        map.on("resize", updateRiver);

        console.log("SVG river rendered successfully");
      } catch (error) {
        console.error("Geospatial rendering failed:", error);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "relative",
        height: "500px",
        width: "100%",
      }}
    />
  );
}