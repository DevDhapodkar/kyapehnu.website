'use client';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

export function useScrollProgress(
  triggerRef: React.RefObject<Element | null>,
  onProgress: (progress: number) => void,
  options?: { start?: string; end?: string; scrub?: number | boolean }
) {
  useEffect(() => {
    if (!triggerRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: options?.start ?? 'top bottom',
      end: options?.end ?? 'bottom top',
      scrub: options?.scrub ?? 1,
      onUpdate: (self) => onProgress(self.progress),
    });
    return () => trigger.kill();
  }, [triggerRef, onProgress, options?.start, options?.end, options?.scrub]);
}
