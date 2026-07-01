import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";

function GlowSphere() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={ref}>
      <Icosahedron args={[1.8, 1]}>
        <meshBasicMaterial color="#00F0FF" wireframe />
      </Icosahedron>
      <Icosahedron args={[2.2, 0]}>
        <meshBasicMaterial color="#7B2CBF" wireframe transparent opacity={0.4} />
      </Icosahedron>
    </group>
  );
}

export default function SkillSphere() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-70" data-testid="skill-sphere">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <GlowSphere />
      </Canvas>
    </div>
  );
}
