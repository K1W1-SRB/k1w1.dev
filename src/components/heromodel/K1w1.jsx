import React from "react";
import { useGLTF } from "@react-three/drei";

export function K1W1(props) {
  const { nodes, materials } = useGLTF("/models/k1w1.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.K1W1Logo.geometry} material={materials.SVGMat} />
    </group>
  );
}

useGLTF.preload("/models/k1w1.glb");
