'use client';
import { useEffect, useRef } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');

    let mx = 0, my = 0, rx = 0, ry = 0;

    function handleMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function tick() {
      setDotX(mx);
      setDotY(my);
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      setRingX(rx);
      setRingY(ry);
    }

    window.addEventListener('mousemove', handleMove);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-colors duration-300 ${
          isLight ? 'bg-neutral-950' : 'bg-white'
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-9 h-9 border rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-colors duration-300 ${
          isLight ? 'border-neutral-900/70 bg-purple-500/5' : 'border-white/60 bg-white/5'
        }`}
      />
    </>
  );
}
