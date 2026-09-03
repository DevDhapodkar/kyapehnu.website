'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageReveal({ src, alt, className = '' }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        clipPath: 'inset(100% 0 0 0)',
        ease: 'power4.inOut',
        duration: 1.2,
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ clipPath: 'inset(0% 0 0 0)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
