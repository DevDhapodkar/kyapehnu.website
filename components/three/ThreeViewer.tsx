'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneLighting } from './SceneLighting';
import { FashionModel } from './FashionModel';
import { ModelFallback } from './ModelFallback';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { useMobileDetect } from '@/hooks/useMobileDetect';
import { useMousePosition } from '@/hooks/useMousePosition';

interface ThreeViewerProps {
  modelPath: string | null;
  className?: string;
}

export function ThreeViewer({ modelPath, className = '' }: ThreeViewerProps) {
  const webGLSupported = useWebGLSupport();
  const isMobile = useMobileDetect();
  const mouse = useMousePosition();

  if (!webGLSupported) {
    return (
      <div className={`${className} bg-neutral-900 flex items-center justify-center`}>
        {/* Static fallback when WebGL unavailable */}
        <div className="text-white/20 text-7xl font-thin tracking-[0.3em]">KP</div>
      </div>
    );
  }

  return (
    <div className={className} aria-label="3D interactive fashion model display">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio}
        shadows={!isMobile}
        gl={{ antialias: !isMobile }}
      >
        <SceneLighting />
        <Suspense fallback={<ModelFallback />}>
          <FashionModel modelPath={modelPath} mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  );
}
