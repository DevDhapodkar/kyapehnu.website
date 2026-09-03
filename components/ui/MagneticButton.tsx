'use client';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

export function MagneticButton({ children, className = '', onClick, 'aria-label': ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isMobile = useMobileDetect();

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-12, Math.min(12, (e.clientX - cx) * 0.3));
    const dy = Math.max(-12, Math.min(12, (e.clientY - cy) * 0.3));
    gsap.to(ref.current, { x: dx, y: dy, duration: 0.2, ease: 'power2.out' });
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 0.7 });
  }

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
