'use client';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ModelFallback } from './ModelFallback';

interface FashionModelProps {
  modelPath: string | null;
  mouseX: number;
  mouseY: number;
}

function GLBModel({ modelPath, mouseX, mouseY }: FashionModelProps & { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null);

  // Base offset so the model faces the camera (Tripo exports with Y-up but facing +X)
  const BASE_Y = -Math.PI / 2;

  useFrame(() => {
    if (!ref.current) return;
    const targetX = mouseY * 0.26;
    const targetY = BASE_Y + mouseX * 0.26;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.05);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.05);
  });

  return <primitive ref={ref} object={scene} dispose={null} scale={2.2} position={[0, -0.3, 0]} />;
}

export function FashionModel({ modelPath, mouseX, mouseY }: FashionModelProps) {
  if (!modelPath) return <ModelFallback />;
  return <GLBModel modelPath={modelPath} mouseX={mouseX} mouseY={mouseY} />;
}
