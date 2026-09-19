"use client";

import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";
import { K1W1 } from "./K1w1";
import HeroLights from "./HeroLights";
import React from "react";

function HeroExperience() {
  const tablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const mobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Canvas
      camera={{ position: [0, 1, 0], fov: 45 }}
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <HeroLights />

      {!mobile && (
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={1.5} color="#a5c9ff" position={[-4, 2, 3]} scale={[2, 2, 1]} />
          <Lightformer form="rect" intensity={0.5} color="#ffd9a5" position={[4, -1, 2]} scale={[2, 2, 1]} />
          <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 3, -4]} scale={3} />
        </Environment>
      )}

      <OrbitControls
        enablePan={false}
        enableZoom={!tablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group
        scale={mobile ? 0.55 : 1.3}
        position={[0, -0.5, 0]}
        rotation={[-0.94, 0.25, 0]}
      >
        <K1W1 mobile={mobile} />
      </group>

      {!mobile && (
        <EffectComposer>
          <Bloom intensity={0.35} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}

export default HeroExperience;
