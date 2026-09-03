'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxHeroViewerProps {
  className?: string;
  imageSrc?: string;
}

export function ParallaxHeroViewer({
  className = '',
  imageSrc = '/images/hero-model.jpg',
}: ParallaxHeroViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -0.5 to 0.5
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth spring physics configuration for organic response
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const mouseX = useSpring(rawMouseX, springConfig);
  const mouseY = useSpring(rawMouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);

  // Parallax translation transforms for depth layers
  const bgTranslateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const bgTranslateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const modelTranslateX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const modelTranslateY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const badgeTranslateX = useTransform(mouseX, [-0.5, 0.5], [25, -25]);
  const badgeTranslateY = useTransform(mouseY, [-0.5, 0.5], [25, -25]);

  // Dynamic light reflection position percentages
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawMouseX.set(x);
    rawMouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* LAYER 1: Background Atmospheric Depth & Dynamic Glow */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
          scale: 1.15,
        }}
      >
        {/* Radial ambient spot highlights */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(120,80,255,0.15) 50%, transparent 70%)',
          }}
        />
        {/* Subtle geometric background grid line accents */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* LAYER 2: Main 3D Card with High-Res Fashion Model */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12 z-10">
        <motion.div
          className="relative w-full max-w-lg aspect-[3/4] max-h-[80vh] rounded-3xl overflow-hidden glass-card shadow-2xl border border-white/10"
          style={{
            rotateX,
            rotateY,
            x: modelTranslateX,
            y: modelTranslateY,
            transformStyle: 'preserve-3d',
          }}
          transition={{ ease: 'easeOut' }}
        >
          {/* High-Resolution Model Image */}
          <div className="relative w-full h-full overflow-hidden bg-neutral-950">
            <Image
              src={imageSrc}
              alt="Kya Pehnu High Fashion Editorial Model"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* Dark vignette overlay for luxury mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Dynamic Specular Sheen Lighting Layer */}
            <motion.div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0.45 : 0.15,
                background: `radial-gradient(600px circle at ${sheenX.get()} ${sheenY.get()}, rgba(255, 255, 255, 0.4), transparent 60%)`,
              }}
            />
          </div>

          {/* LAYER 3: Floating UI Accent Badges with 3D Spatial Offset */}
          {/* Top-Right Badge: Fast Delivery */}
          <motion.div
            className="absolute top-6 right-6 z-30 pointer-events-none"
            style={{
              x: badgeTranslateX,
              y: badgeTranslateY,
              transform: 'translateZ(50px)',
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] tracking-wider shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>60 MIN EXPRESS</span>
            </div>
          </motion.div>

          {/* Bottom-Left Tag: AI Match Confidence */}
          <motion.div
            className="absolute bottom-6 left-6 z-30 pointer-events-none"
            style={{
              x: badgeTranslateX,
              y: badgeTranslateY,
              transform: 'translateZ(40px)',
            }}
          >
            <div className="flex flex-col gap-0.5 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl">
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                AI STYLIST MATCH
              </span>
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                ✦ 99.4% FIT CONFIDENCE
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
