'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface SplitTextProps {
  text: string;
  className?: string;
  triggerRef?: React.RefObject<Element | null>;
}

export function SplitText({ text, className = '', triggerRef }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useMobileDetect();

  useEffect(() => {
    if (reduced || isMobile || !containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.char');
    const ctx = gsap.context(() => {
      gsap.from(chars, {
        opacity: 0,
        y: 40,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: triggerRef?.current ?? containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, [reduced, isMobile, triggerRef]);

  if (reduced || isMobile) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block" aria-hidden="true">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
