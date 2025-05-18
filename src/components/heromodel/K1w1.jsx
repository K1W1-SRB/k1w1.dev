import React from "react";
import { useGLTF } from "@react-three/drei";

export function K1W1(props) {
  const { nodes, materials } = useGLTF("/models/k1w1.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Curve001.geometry}
        material={materials.SVGMat}
        scale={[7.311, 1, 7.311]}
      />
      <mesh
        geometry={nodes.Curve002.geometry}
        material={materials.SVGMat}
        scale={[7.311, 1, 7.311]}
      />
      <mesh
        geometry={nodes.Curve003.geometry}
        material={materials.SVGMat}
        scale={[7.311, 1, 7.311]}
      />
      <mesh
        geometry={nodes.Curve004.geometry}
        material={materials.SVGMat}
        scale={[7.311, 1, 7.311]}
      />
      <mesh
        geometry={nodes.Curve005.geometry}
        material={materials.SVGMat}
        scale={[7.311, 1, 7.311]}
      />
    </group>
  );
}

useGLTF.preload("/models/k1w1.glb");
