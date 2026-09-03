'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
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

  const mapSrc = isLight
    ? '/images/nagpur-map-carrara.webp'
    : '/images/nagpur-map-midnight.webp';

  return (
    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border shadow-2xl transition-all duration-500 ${
      isLight
        ? 'bg-white/90 border-purple-200/80 shadow-purple-500/10'
        : 'bg-[#090a10] border-purple-500/25 shadow-black/80'
    }`}>
      {/* Header bar with coordinates and live ETA */}
      <div className={`flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b text-[9px] sm:text-[11px] font-mono tracking-wider transition-colors ${
        isLight ? 'bg-white/80 border-purple-100 text-neutral-700' : 'bg-black/50 border-white/10 text-white/70'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-purple-700 dark:text-purple-300">NAGPUR TERRAIN DISPATCH</span>
        </div>
        <div className="hidden sm:block text-neutral-400 font-normal">
          21.1458° N, 79.0882° E
        </div>
        <div className={`font-semibold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
          {Math.round(progress * 100)}% DISPATCHED
        </div>
      </div>

      {/* Map visual canvas area */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full overflow-hidden bg-neutral-950">
        {/* Actual Nagpur Terrain Map Image */}
        <Image
          src={mapSrc}
          alt="Nagpur Topographic City Map"
          fill
          priority
          sizes="(max-width: 768px) 95vw, 600px"
          className="object-cover object-center transform scale-105"
        />

        {/* Thematic Vignette / Gradient Overlay to integrate smoothly */}
        <div className={`absolute inset-0 pointer-events-none transition-colors ${
          isLight
            ? 'bg-gradient-to-t from-white/60 via-transparent to-white/30 mix-blend-soft-light'
            : 'bg-gradient-to-t from-black/75 via-transparent to-black/35'
        }`} />

        {/* Neighborhood Landmark Tags on the Map */}
        <div className="absolute inset-0 pointer-events-none z-10 text-[8px] sm:text-[10px] font-mono select-none">
          {/* Dharampeth */}
          <div className="absolute top-[68%] left-[10%] -translate-x-1/2 -translate-y-1/2">
            <span className={`px-2 py-0.5 rounded backdrop-blur-md border shadow-sm font-semibold ${
              isLight ? 'bg-white/85 border-neutral-300 text-neutral-800' : 'bg-black/75 border-white/20 text-white'
            }`}>
              Dharampeth
            </span>
          </div>

          {/* Sitabuldi */}
          <div className="absolute top-[48%] left-[48%] -translate-x-1/2 -translate-y-1/2">
            <span className={`px-2 py-0.5 rounded backdrop-blur-md border shadow-sm ${
              isLight ? 'bg-white/85 border-neutral-300 text-neutral-700' : 'bg-black/75 border-white/20 text-white/80'
            }`}>
              Sitabuldi
            </span>
          </div>

          {/* Sadar */}
          <div className="absolute top-[28%] left-[60%] -translate-x-1/2 -translate-y-1/2">
            <span className={`px-2 py-0.5 rounded backdrop-blur-md border shadow-sm ${
              isLight ? 'bg-white/85 border-neutral-300 text-neutral-700' : 'bg-black/75 border-white/20 text-white/80'
            }`}>
              Sadar
            </span>
          </div>

          {/* Wardha Rd / IT Park */}
          <div className="absolute top-[72%] right-[8%] -translate-x-1/2 -translate-y-1/2">
            <span className={`px-2 py-0.5 rounded backdrop-blur-md border shadow-sm font-semibold ${
              isLight ? 'bg-purple-900 border-purple-700 text-white' : 'bg-purple-600 border-purple-400 text-white'
            }`}>
              IT Park (You)
            </span>
          </div>
        </div>

        {/* SVG Route Trajectory Overlay */}
        <svg
          viewBox="0 0 500 250"
          className="absolute inset-0 w-full h-full z-20 overflow-visible"
          aria-label="Delivery trajectory route"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Inactive Route Base Outline */}
          <path
            ref={pathRef}
            d="M 50,170 C 110,165 140,125 240,120 C 310,115 360,70 410,70 C 440,70 435,160 455,180"
            fill="none"
            stroke={isLight ? 'rgba(15,23,42,0.3)' : 'rgba(255,255,255,0.35)'}
            strokeWidth="3.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />

          {/* Active Glowing Traveled Route */}
          <path
            ref={activePathRef}
            d="M 50,170 C 110,165 140,125 240,120 C 310,115 360,70 410,70 C 440,70 435,160 455,180"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#routeGlow)"
          />

          {/* Origin Hub Icon */}
          <circle cx="50" cy="170" r="10" fill={isLight ? '#0f172a' : '#ffffff'} />
          <circle cx="50" cy="170" r="5" fill="#7c3aed" />

          {/* Destination Pin */}
          <circle cx="455" cy="180" r="12" fill="#ec4899" className="animate-pulse" />
          <circle cx="455" cy="180" r="6" fill="#ffffff" />

          {/* Moving Rider Dot & Halo */}
          <circle ref={pulseRef} cx="50" cy="170" r="16" fill="#7c3aed" opacity="0.3" className="animate-ping" />
          <circle ref={dotRef} cx="50" cy="170" r="7" fill="#9333ea" stroke="#ffffff" strokeWidth="2.5" filter="drop-shadow(0 0 6px rgba(124,58,237,0.8))" />
        </svg>
      </div>

      {/* Footer metadata bar */}
      <div className={`px-4 py-2 border-t flex items-center justify-between text-[8px] sm:text-[10px] font-mono ${
        isLight ? 'bg-purple-50/50 border-purple-100 text-neutral-600' : 'bg-black/60 border-white/10 text-white/50'
      }`}>
        <span>HUB: DHARAMPETH DISPATCH CENTER</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">AVERAGE TRANSIT: 38 MINS</span>
      </div>
    </div>
  );
}
