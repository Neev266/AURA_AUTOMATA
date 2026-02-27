import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import Avatar from "./Avatar";

export default function Scene({ onAvatarReady }) {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 1.8], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[0, 3, 3]} intensity={2} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Avatar onReady={onAvatarReady} />
      </Suspense>
    </Canvas>
  );
}