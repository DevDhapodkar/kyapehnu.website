'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ScrollytellingHeroProps {
  className?: string;
}

const CHAPTERS = [
  { id: '01', title: 'YOUR LOOK. 60 MINUTES.', desc: 'High fashion delivered to your doorstep before your plans begin.' },
  { id: '02', title: 'CURATED FOR TONIGHT.', desc: 'Handpicked premium outfits tailored to your occasion and style.' },
  { id: '03', title: 'EXPRESS DISPATCH.', desc: 'Live tracking, zero-hassle sizing, and 60-minute delivery guaranteed.' },
  { id: '04', title: 'READY TO WEAR.', desc: 'Unbox, step out, and own the night.' },
];

export function ScrollytellingHero({ className = '' }: ScrollytellingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll Progress across 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll spring for ultra-fluid response
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.2,
  });

  // Transform mapping per scroll chapter
  // Image scale & zoom
  const modelScale = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [1, 1.2, 1.1, 1.05]);

  // Image 3D Perspective Rotation
  const modelRotateY = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0, -12, 14, 0]);
  const modelRotateX = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0, 6, -6, 0]);

  // Image Crossfade (hero-model -> hero-model-alt)
  const imageAltOpacity = useTransform(smoothProgress, [0.55, 0.8], [0, 1]);

  // Chapter 1 Opacity & Y
  const ch1Opacity = useTransform(smoothProgress, [0, 0.2, 0.28], [1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0, 0.25], [0, -40]);

  // Chapter 2 Opacity & Y
  const ch2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [40, 0, 0, -40]);

  // Chapter 3 Opacity & Y
  const ch3Opacity = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [0, 1, 1, 0]);
  const ch3Y = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [40, 0, 0, -40]);

  // Chapter 4 Opacity & Y
  const ch4Opacity = useTransform(smoothProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const ch4Y = useTransform(smoothProgress, [0.78, 0.88, 1], [40, 0, 0]);

  // Floating tags 3D offsets
  const tag1X = useTransform(smoothProgress, [0.45, 0.7], [-80, 0]);
  const tag2X = useTransform(smoothProgress, [0.45, 0.7], [80, 0]);

  // Handle subtle interactive mouse tilt on top of scroll
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative h-[300vh] w-full bg-[#050508] ${className}`}
    >
      {/* Sticky Full-Viewport Storytelling Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Ambient Glow Mesh */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 transition-all duration-700"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(140,90,255,0.18) 45%, transparent 70%)',
              transform: `translate(calc(-50% + ${mousePos.x * 30}px), calc(-50% + ${mousePos.y * 30}px))`,
            }}
          />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Central Scrollytelling Fashion Model Display */}
        <div className="relative z-10 w-full max-w-5xl h-[85vh] flex items-center justify-center p-6 md:p-12">
          {/* Main 3D Card */}
          <motion.div
            className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl"
            style={{
              scale: modelScale,
              rotateY: modelRotateY,
              rotateX: modelRotateX,
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            {/* Primary Model Image */}
            <div className="relative w-full h-full bg-neutral-950">
              <Image
                src="/images/hero-model.jpg"
                alt="Kya Pehnu Fashion Model"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Secondary Alternate Look Image (Cross-faded on scroll) */}
              <motion.div
                className="absolute inset-0 z-10"
                style={{ opacity: imageAltOpacity }}
              >
                <Image
                  src="/images/hero-model-alt.jpg"
                  alt="Kya Pehnu Alternate Look"
                  fill
                  className="object-cover object-center"
                />
              </motion.div>

              {/* Dark Vignette Gradient */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
            </div>

            {/* Chapter 3 Floating 3D Depth Badges */}
            <motion.div
              className="absolute top-8 left-6 z-30 pointer-events-none"
              style={{ opacity: ch3Opacity, x: tag1X }}
            >
              <div className="px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] tracking-wider shadow-lg flex items-center gap-2">
                <span>✦ PREMIUM OUTFIT</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 right-6 z-30 pointer-events-none"
              style={{ opacity: ch3Opacity, x: tag2X }}
            >
              <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white font-mono text-xs tracking-wider shadow-xl flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>60 MIN EXPRESS DELIVERY</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Overlay Content Chapters Driven by Scroll */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16">
          {/* Top Brand Header */}
          <div className="flex justify-between items-center">
            <p className="text-white/40 text-xs tracking-[0.5em] font-mono">KYA PEHNU? · SCROLL EXPERIENCE</p>
            <p className="text-white/30 text-xs tracking-widest font-mono hidden md:block">01 / 04</p>
          </div>

          {/* Dynamic Storytelling Text Blocks */}
          <div className="relative max-w-xl">
            {/* Chapter 1 */}
            <motion.div
              style={{ opacity: ch1Opacity, y: ch1Y }}
              className="glass-card p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <p className="text-white/40 text-xs tracking-[0.5em] font-mono mb-3 uppercase">01 / THE SOLUTION</p>
              <h1 className="text-white text-4xl md:text-6xl font-thin tracking-tight leading-none mb-6">
                YOUR LOOK.<br />60 MINUTES.
              </h1>
              <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
                Discover, personalise, and receive your new outfit before your evening plans begin.
              </p>
              <div className="pointer-events-auto">
                <MagneticButton className="bg-white text-black text-xs tracking-widest px-8 py-4 font-mono hover:bg-neutral-200 transition-colors">
                  EXPLORE OUTFITS ↓
                </MagneticButton>
              </div>
            </motion.div>

            {/* Chapter 2 */}
            <motion.div
              style={{ opacity: ch2Opacity, y: ch2Y }}
              className="absolute inset-0 glass-card p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <p className="text-white/40 text-xs tracking-[0.5em] font-mono mb-3 uppercase">02 / CURATED STYLE</p>
              <h2 className="text-white text-3xl md:text-5xl font-thin tracking-tight leading-tight mb-4">
                CURATED FOR<br />YOUR TONIGHT.
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe.
              </p>
            </motion.div>

            {/* Chapter 3 */}
            <motion.div
              style={{ opacity: ch3Opacity, y: ch3Y }}
              className="absolute inset-0 glass-card p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <p className="text-white/40 text-xs tracking-[0.5em] font-mono mb-3 uppercase">03 / ULTRA FAST</p>
              <h2 className="text-white text-3xl md:text-5xl font-thin tracking-tight leading-tight mb-4">
                FAST. DIRECT.<br />TO YOUR DOOR.
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                No standard 3-day shipping. Your outfit is dispatched instantly by local express couriers.
              </p>
            </motion.div>

            {/* Chapter 4 */}
            <motion.div
              style={{ opacity: ch4Opacity, y: ch4Y }}
              className="absolute inset-0 glass-card p-8 md:p-10 rounded-3xl border border-white/10"
            >
              <p className="text-white/40 text-xs tracking-[0.5em] font-mono mb-3 uppercase">04 / READY TO STEP OUT</p>
              <h2 className="text-white text-3xl md:text-5xl font-thin tracking-tight leading-tight mb-4">
                STEP OUT WITH<br />CONFIDENCE.
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed">
                Zero hassle. Perfect fit. Ready to wear the moment you unbox.
              </p>
              <div className="pointer-events-auto">
                <MagneticButton className="bg-white text-black text-xs tracking-widest px-8 py-4 font-mono hover:bg-neutral-200 transition-colors">
                  GET STARTED NOW →
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Left Vertical Progress Navigation Dots */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
            {CHAPTERS.map((ch, idx) => (
              <div key={ch.id} className="flex items-center gap-3 group cursor-pointer">
                <span className="text-[10px] font-mono text-white/30 group-hover:text-white transition-colors">
                  {ch.id}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>
            ))}
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="flex justify-between items-end">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-white/20 overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1/2 bg-white/70"
                  animate={{ y: ['0%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <p className="text-white/30 text-[10px] tracking-widest font-mono">SCROLL TO DISCOVER</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
