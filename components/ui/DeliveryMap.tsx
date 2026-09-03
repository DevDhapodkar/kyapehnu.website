'use client';
import { useEffect, useRef } from 'react';

interface DeliveryMapProps {
  progress: number; // 0–1
}

export function DeliveryMap({ progress }: DeliveryMapProps) {
  const dotRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    if (dotRef.current) {
      dotRef.current.setAttribute('cx', String(pt.x));
      dotRef.current.setAttribute('cy', String(pt.y));
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 200" className="w-full opacity-60" aria-label="Delivery route map">
      {/* Abstract city grid lines */}
      <line x1="0" y1="50" x2="400" y2="50" stroke="#ffffff20" strokeWidth="1" />
      <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff20" strokeWidth="1" />
      <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff20" strokeWidth="1" />
      <line x1="80" y1="0" x2="80" y2="200" stroke="#ffffff20" strokeWidth="1" />
      <line x1="200" y1="0" x2="200" y2="200" stroke="#ffffff20" strokeWidth="1" />
      <line x1="320" y1="0" x2="320" y2="200" stroke="#ffffff20" strokeWidth="1" />
      {/* Delivery path */}
      <path
        ref={pathRef}
        d="M 40,160 L 80,160 L 80,100 L 200,100 L 200,50 L 320,50 L 320,100 L 360,100"
        fill="none"
        stroke="#ffffff40"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {/* Store icon */}
      <rect x="30" y="150" width="20" height="20" rx="2" fill="#fff" opacity="0.8" />
      <text x="40" y="163" textAnchor="middle" fontSize="8" fill="#000">S</text>
      {/* Home icon */}
      <circle cx="360" cy="100" r="10" fill="#fff" opacity="0.8" />
      <text x="360" y="104" textAnchor="middle" fontSize="8" fill="#000">H</text>
      {/* Moving dot */}
      <circle ref={dotRef} cx="40" cy="160" r="5" fill="#ffffff" />
    </svg>
  );
}
