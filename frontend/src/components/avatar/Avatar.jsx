import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import useLipSync from "./useLipSync";

export default function Avatar({ onReady }) {
  const group = useRef();

  const { scene } = useGLTF(
    "https://models.readyplayer.me/6999ba7d2b9bcc76d5f61532.glb?morphTargets=ARKit&quality=high"
  );

  const lipSync = useLipSync(scene);

  // 🔥 Wait until scene loads properly
  useEffect(() => {
    if (scene && lipSync && onReady) {
      console.log("Avatar loaded, sending lipSync controller");
      onReady(lipSync);
    }
  }, [scene]);

  return (
    <group
      ref={group}
      position={[0, -2.5, 0]}   // centered
      rotation={[0, 0, 0]}      // straight
    >
      <primitive object={scene} scale={1.6} />
    </group>
  );
}