import React from "react";
import { useGLTF } from "@react-three/drei";

export function K1W1({ mobile, ...props }) {
  const { nodes } = useGLTF("/models/k1w1.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.K1W1Logo.geometry}>
        {mobile ? (
          <meshStandardMaterial color="#dcdce0" roughness={0.55} metalness={0.15} envMapIntensity={0.8} />
        ) : (
          <meshPhysicalMaterial
            color="#e8e8ec"
            roughness={0.28}
            metalness={0.65}
            envMapIntensity={1.4}
            clearcoat={0.4}
            clearcoatRoughness={0.25}
          />
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/k1w1.glb");
