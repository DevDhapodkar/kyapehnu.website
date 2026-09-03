import * as THREE from 'three';

export function createThreePointLighting(scene: THREE.Scene) {
  // Key light
  const keyLight = new THREE.DirectionalLight('#ffffff', 2);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  // Fill light
  const fillLight = new THREE.DirectionalLight('#c8d8ff', 0.8);
  fillLight.position.set(-5, 2, 3);
  scene.add(fillLight);

  // Rim light
  const rimLight = new THREE.DirectionalLight('#ffd0a0', 0.6);
  rimLight.position.set(0, 5, -8);
  scene.add(rimLight);

  return { keyLight, fillLight, rimLight };
}
