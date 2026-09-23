"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Html } from "@react-three/drei";
import * as THREE from "three";

function TerrainSurface() {
  const size = 10;
  const segments = 40;

  const geometry = new THREE.PlaneGeometry(
    size,
    size,
    segments,
    segments
  );

  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);

    const height =
      Math.sin(x * 1.2) * 0.4 +
      Math.cos(y * 1.5) * 0.3;

    position.setZ(i, height);
  }

  
  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial color="#294936" />
    </mesh>
  );
}

function TerrainLabels() {
  return (
    <>
      <Html position={[-4, 1, -4]}>
        <div className="rounded bg-black/70 px-2 py-1 text-xs text-white">
          Dam Zone
        </div>
      </Html>

      <Html position={[3, 1, 2]}>
        <div className="rounded bg-black/70 px-2 py-1 text-xs text-white">
          Impact Area
        </div>
      </Html>
    </>
  );
}

function WaterGrid({ waterGrid }: { waterGrid: number[][] }) {
  const size = waterGrid.length;
  const cellSize = 10 / size;

  return (
    <group position={[-5, 0.2, -5]}>
      {waterGrid.map((row, z) =>
        row.map((depth, x) => {
          if (depth <= 0.001) return null;

          const intensity = Math.min(depth * 5, 1);

          return (
            <mesh
              key={`${x}-${z}`}
              position={[
                x * cellSize + cellSize / 2,
                intensity * 0.15,
                z * cellSize + cellSize / 2,
              ]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[cellSize, cellSize]} />
              <meshStandardMaterial
                color="#1683ff"
                transparent
                opacity={0.35 + intensity * 0.6}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
}

export default function TerrainScene({
  waterGrid,
}: {
  waterGrid?: number[][];
}) {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.4} />

        <TerrainSurface />
        {waterGrid && <WaterGrid waterGrid={waterGrid} />}
        <TerrainLabels />

        <Grid args={[20, 20]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
