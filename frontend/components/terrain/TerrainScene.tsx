"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";

function TerrainSurface() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 20, 20]} />
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
