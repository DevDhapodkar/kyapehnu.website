'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ModelFallback() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.4, 0.6, 2, 8]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  );
}
