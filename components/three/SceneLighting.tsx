'use client';

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, 2, 3]} intensity={0.8} color="#c8d8ff" />
      <directionalLight position={[0, 5, -8]} intensity={0.6} color="#ffd0a0" />
    </>
  );
}
