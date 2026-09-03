'use client';
import { useEffect, useRef } from 'react';
import { useApp } from '@/components/providers/AppProvider';

interface DeliveryMapProps {
  progress: number; // 0–1
}

export function DeliveryMap({ progress }: DeliveryMapProps) {
  const dotRef = useRef<SVGCircleElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const pt = path.getPointAtLength(clampedProgress * len);

    if (dotRef.current) {
      dotRef.current.setAttribute('cx', String(pt.x));
      dotRef.current.setAttribute('cy', String(pt.y));
    }
    if (pulseRef.current) {
      pulseRef.current.setAttribute('cx', String(pt.x));
      pulseRef.current.setAttribute('cy', String(pt.y));
    }
    if (activePathRef.current) {
      activePathRef.current.style.strokeDasharray = `${clampedProgress * len} ${len}`;
    }
  }, [progress]);

  const gridColor = isLight ? 'rgba(124, 58, 237, 0.12)' : 'rgba(255, 255, 255, 0.12)';
  const routeBaseColor = isLight ? 'rgba(15, 23, 42, 0.18)' : 'rgba(255, 255, 255, 0.25)';
  const activeRouteColor = isLight ? '#7c3aed' : '#a855f7';
  const hubBg = isLight ? '#0f172a' : '#ffffff';
  const hubText = isLight ? '#ffffff' : '#000000';
  const destBg = isLight ? '#7c3aed' : '#c084fc';
  const destText = '#ffffff';

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-colors shadow-lg ${
      isLight ? 'bg-white/90 border-purple-200/60' : 'bg-neutral-900/80 border-purple-400/20'
    }`}>
      <div className="flex justify-between items-center mb-3 font-mono text-[10px] sm:text-xs">
        <span className={isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}>
          ● NAGPUR EXPRESS ROUTE
        </span>
        <span className={isLight ? 'text-neutral-500' : 'text-white/40'}>
          {Math.round(progress * 100)}% COMPLETE
        </span>
      </div>

      <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible" aria-label="Delivery route map">
        {/* City grid street lines */}
        <line x1="0" y1="50" x2="400" y2="50" stroke={gridColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="0" y1="100" x2="400" y2="100" stroke={gridColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="0" y1="150" x2="400" y2="150" stroke={gridColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="80" y1="0" x2="80" y2="200" stroke={gridColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="200" y1="0" x2="200" y2="200" stroke={gridColor} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="320" y1="0" x2="320" y2="200" stroke={gridColor} strokeWidth="1" strokeDasharray="2 2" />

        {/* Base Inactive delivery route */}
        <path
          ref={pathRef}
          d="M 40,160 L 80,160 L 80,100 L 200,100 L 200,50 L 320,50 L 320,100 L 360,100"
          fill="none"
          stroke={routeBaseColor}
          strokeWidth="3"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Traveled Route with progress */}
        <path
          ref={activePathRef}
          d="M 40,160 L 80,160 L 80,100 L 200,100 L 200,50 L 320,50 L 320,100 L 360,100"
          fill="none"
          stroke={activeRouteColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Store / Hub Pin */}
        <rect x="26" y="148" width="28" height="24" rx="4" fill={hubBg} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
        <text x="40" y="164" textAnchor="middle" fontSize="9" fontWeight="bold" fill={hubText} fontFamily="monospace">
          HUB
        </text>

        {/* Home / Destination Pin */}
        <circle cx="360" cy="100" r="14" fill={destBg} filter="drop-shadow(0 2px 6px rgba(124,58,237,0.3))" />
        <text x="360" y="103.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill={destText} fontFamily="monospace">
          YOU
        </text>

        {/* Moving rider pulse halo */}
        <circle ref={pulseRef} cx="40" cy="160" r="12" fill={activeRouteColor} opacity="0.25" className="animate-ping" />

        {/* Moving rider dot */}
        <circle ref={dotRef} cx="40" cy="160" r="6" fill={activeRouteColor} stroke="#ffffff" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(0,0,0,0.4))" />
      </svg>
    </div>
  );
}
