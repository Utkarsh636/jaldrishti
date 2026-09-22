"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

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

function WaterSurface() {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (waterRef.current) {
      const time = clock.getElapsedTime();
      const scale = 1 + (Math.sin(time * 0.5) + 1) * 0.15;

      waterRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh
      ref={waterRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.15, 0]}
    >
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        color="#2563eb"
        transparent
        opacity={0.6}
      />
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

export default function TerrainScene() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.4} />

        <TerrainSurface />
        <WaterSurface />
        <TerrainLabels />

        <Grid args={[20, 20]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
