'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ScrollytellingHeroProps {
  className?: string;
}

export function ScrollytellingHero({ className = '' }: ScrollytellingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll Progress across 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll spring for fluid animation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.2,
  });

  // Image 3D Transform & Zoom
  const modelScale = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1, 1.12, 1.06, 1.02]);
  const modelRotateY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, -8, 10, 0]);
  const modelRotateX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, 4, -4, 0]);

  // Crossfade between primary and secondary dark studio fashion images
  const imageAltOpacity = useTransform(smoothProgress, [0.55, 0.8], [0, 1]);

  // Chapter 1 Opacity & Y (Scroll 0% -> 25%)
  const ch1Opacity = useTransform(smoothProgress, [0, 0.2, 0.28], [1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0, 0.25], [0, -30]);

  // Chapter 2 Opacity & Y (Scroll 25% -> 50%)
  const ch2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [30, 0, 0, -30]);

  // Chapter 3 Opacity & Y (Scroll 50% -> 75%)
  const ch3Opacity = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [0, 1, 1, 0]);
  const ch3Y = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [30, 0, 0, -30]);

  // Chapter 4 Opacity & Y (Scroll 75% -> 100%)
  const ch4Opacity = useTransform(smoothProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const ch4Y = useTransform(smoothProgress, [0.78, 0.88, 1], [30, 0, 0]);

  // Floating tags X offset
  const tagOpacity = useTransform(smoothProgress, [0.45, 0.6, 0.85], [0, 1, 1]);

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
      {/* Sticky Full Viewport Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 md:px-12 pt-20 pb-8">
        {/* Background Ambient Glow & Dark Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[700px] md:h-[900px] rounded-full blur-[160px] opacity-25 transition-all duration-700"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(120,80,220,0.15) 50%, transparent 75%)',
              transform: `translate(calc(-50% + ${mousePos.x * 25}px), calc(-50% + ${mousePos.y * 25}px))`,
            }}
          />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Balanced Split Grid Layout: Left Content, Right Model Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean Scrollytelling Typography Container */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-xl mx-auto lg:mx-0">
              
              {/* Chapter 1: The Solution */}
              <motion.div
                style={{ opacity: ch1Opacity, y: ch1Y }}
                className="glass-card p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
              >
                <p className="text-white/40 text-xs tracking-[0.4em] font-mono mb-3 uppercase">01 / THE SOLUTION</p>
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight leading-none mb-6">
                  YOUR LOOK.<br />60 MINUTES.
                </h1>
                <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
                  Discover, personalise, and receive your complete new outfit before your plans begin.
                </p>
                <div>
                  <MagneticButton className="bg-white text-black text-xs tracking-widest px-8 py-4 font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                    EXPLORE OUTFITS ↓
                  </MagneticButton>
                </div>
              </motion.div>

              {/* Chapter 2: Curated Style */}
              <motion.div
                style={{ opacity: ch2Opacity, y: ch2Y }}
                className="absolute inset-0 glass-card p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
              >
                <p className="text-white/40 text-xs tracking-[0.4em] font-mono mb-3 uppercase">02 / CURATED STYLE</p>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-4">
                  CURATED FOR<br />YOUR TONIGHT.
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe.
                </p>
              </motion.div>

              {/* Chapter 3: Express Dispatch */}
              <motion.div
                style={{ opacity: ch3Opacity, y: ch3Y }}
                className="absolute inset-0 glass-card p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
              >
                <p className="text-white/40 text-xs tracking-[0.4em] font-mono mb-3 uppercase">03 / ULTRA FAST</p>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-4">
                  FAST. DIRECT.<br />TO YOUR DOOR.
                </h2>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Delivering across Dharampeth, Sadar, Sitabuldi, IT Park, and all of Nagpur in under 60 minutes.
                </p>
              </motion.div>

              {/* Chapter 4: Ready to Wear */}
              <motion.div
                style={{ opacity: ch4Opacity, y: ch4Y }}
                className="absolute inset-0 glass-card p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
              >
                <p className="text-white/40 text-xs tracking-[0.4em] font-mono mb-3 uppercase">04 / READY TO STEP OUT</p>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-4">
                  STEP OUT WITH<br />CONFIDENCE.
                </h2>
                <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed">
                  Zero hassle. Perfect fit. Ready to wear the moment you unbox.
                </p>
                <div>
                  <MagneticButton className="bg-white text-black text-xs tracking-widest px-8 py-4 font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                    GET STARTED NOW →
                  </MagneticButton>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: Sleek Dark Studio Model Display Card */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] rounded-3xl overflow-hidden glass-card border border-white/15 shadow-2xl"
              style={{
                scale: modelScale,
                rotateY: modelRotateY,
                rotateX: modelRotateX,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Primary High-Res Dark Studio Model Image */}
              <div className="relative w-full h-full bg-[#050508]">
                <Image
                  src="/images/nagpur-hero-model-v2.jpg"
                  alt="Kya Pehnu Nagpur Fashion Model"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  priority
                  className="object-cover object-center"
                />

                {/* Secondary Dark Studio Alternate Image */}
                <motion.div
                  className="absolute inset-0 z-10"
                  style={{ opacity: imageAltOpacity }}
                >
                  <Image
                    src="/images/nagpur-hero-model-alt-v2.jpg"
                    alt="Kya Pehnu Nagpur Alternate Outfit Look"
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Vignette Shadow Gradient for Seamless Dark Theme Blend */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050508] via-transparent to-black/30 opacity-80" />
              </div>

              {/* Floating Spatial Badges Positioned Non-Obstructively */}
              <motion.div
                className="absolute top-4 right-4 z-30 pointer-events-none"
                style={{ opacity: tagOpacity }}
              >
                <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] tracking-wider shadow-lg flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>60 MINS IN NAGPUR</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 z-30 pointer-events-none"
                style={{ opacity: tagOpacity }}
              >
                <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-mono text-[11px] tracking-wider shadow-xl flex items-center gap-1.5">
                  <span>✦ NAGPUR EDITION</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Subtle Bottom Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-none">
          <div className="w-px h-8 bg-white/20 overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-white/70"
              animate={{ y: ['0%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <p className="text-white/30 text-[9px] tracking-[0.25em] font-mono uppercase">SCROLL</p>
        </div>

      </div>
    </div>
  );
}
