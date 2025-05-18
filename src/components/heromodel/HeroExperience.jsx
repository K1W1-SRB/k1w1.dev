"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { K1W1 } from "./K1w1";
import HeroLights from "./HeroLights";
import React from "react";

function HeroExperience() {
  const tablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Canvas camera={{ position: [0, 1, 0], fov: 45 }}>
      <HeroLights />

      <OrbitControls
        enablePan={false}
        enableZoom={!tablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group
        scale={mobile ? 0.7 : 1.7}
        position={[0, -0.5, 0]}
        rotation={[1, 0, 0.5]}
      >
        <K1W1 />
      </group>
    </Canvas>
  );
}

export default HeroExperience;
