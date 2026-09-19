import React from "react";

function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.25} color="#3a3f4a" />
      <directionalLight position={[2, 8, 5]} intensity={0.5} color="#dbe9ff" />
      <directionalLight position={[-4, -1, 2]} intensity={0.5} color="#ffd9b3" />
      <directionalLight position={[-2, 2, -5]} intensity={1.5} color="#7fb8ff" />
    </>
  );
}

export default HeroLights;
