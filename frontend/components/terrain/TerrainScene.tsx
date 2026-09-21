"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
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

export default function TerrainScene() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <TerrainSurface />

        <Grid args={[20, 20]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
