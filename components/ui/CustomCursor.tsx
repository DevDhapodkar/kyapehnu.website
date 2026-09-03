'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50 hidden lg:block"
      />
    </>
  );
}
