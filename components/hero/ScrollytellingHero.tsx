'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ScrollytellingHeroProps {
  className?: string;
}

export function ScrollytellingHero({ className = '' }: ScrollytellingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useApp();
  const isLight = theme === 'light';

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

  // Crossfade between primary authentic Indian model image and secondary outfit image
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
      className={`relative h-[300vh] w-full transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fc] text-neutral-900' : 'bg-[#050508] text-white'
      } ${className}`}
    >
      {/* Sticky Full Viewport Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-6 sm:pb-8">
        
        {/* ─── PURPLISH FLOATING BLOBS FOR GLASSMORPHISM HIGHLIGHT ─────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Blob 1: Top Left Electric Purple / Violet Blob */}
          <motion.div
            className="absolute top-1/4 left-1/6 w-[320px] sm:w-[450px] md:w-[650px] h-[320px] sm:h-[450px] md:h-[650px] rounded-full blur-[100px] sm:blur-[140px]"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(147, 51, 234, 0.28) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 75%)',
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Blob 2: Bottom Right Magenta / Deep Violet Blob */}
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full blur-[100px] sm:blur-[140px]"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(236, 72, 153, 0.24) 0%, rgba(217, 70, 239, 0.14) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, rgba(192, 38, 211, 0.18) 50%, transparent 75%)',
            }}
            animate={{
              x: [0, -45, 35, 0],
              y: [0, 40, -40, 0],
              scale: [1, 0.92, 1.12, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Blob 3: Center Ambient Halo driven by Mouse */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[900px] h-[500px] sm:h-[700px] md:h-[900px] rounded-full blur-[120px] sm:blur-[160px] opacity-35 transition-all duration-700"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(129, 140, 248, 0.12) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(124, 58, 237, 0.18) 50%, transparent 75%)',
              transform: `translate(calc(-50% + ${mousePos.x * 35}px), calc(-50% + ${mousePos.y * 35}px))`,
            }}
          />

          {/* Grid lines overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Balanced Split Grid Layout: Left Content, Right Image Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean Scrollytelling Typography Container */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-xl mx-auto lg:mx-0">
              
              {/* Chapter 1: The Solution */}
              <motion.div
                style={{ opacity: ch1Opacity, y: ch1Y }}
                className="glass-card p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl"
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.4em] font-mono mb-2 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                  01 / THE SOLUTION
                </p>
                <h1 className={`text-3xl sm:text-5xl md:text-6xl font-thin tracking-tight leading-none mb-3 sm:mb-6 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                  YOUR LOOK.<br />60 MINUTES.
                </h1>
                <p className={`text-xs sm:text-sm md:text-base mb-5 sm:mb-8 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                  Discover, personalise, and receive your complete new outfit before your plans begin.
                </p>
                <div>
                  <MagneticButton className={`text-[11px] sm:text-xs tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 font-mono transition-colors w-full sm:w-auto min-h-[44px] flex items-center justify-center ${
                    isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
                  }`}>
                    EXPLORE OUTFITS ↓
                  </MagneticButton>
                </div>
              </motion.div>

              {/* Chapter 2: Curated Style */}
              <motion.div
                style={{ opacity: ch2Opacity, y: ch2Y }}
                className="absolute inset-0 glass-card p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl"
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.4em] font-mono mb-2 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                  02 / CURATED STYLE
                </p>
                <h2 className={`text-2xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-3 sm:mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                  CURATED FOR<br />YOUR TONIGHT.
                </h2>
                <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                  From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe.
                </p>
              </motion.div>

              {/* Chapter 3: Express Dispatch */}
              <motion.div
                style={{ opacity: ch3Opacity, y: ch3Y }}
                className="absolute inset-0 glass-card p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl"
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.4em] font-mono mb-2 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                  03 / ULTRA FAST
                </p>
                <h2 className={`text-2xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-3 sm:mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                  FAST. DIRECT.<br />TO YOUR DOOR.
                </h2>
                <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                  Delivering across Dharampeth, Sadar, Sitabuldi, IT Park, and all of Nagpur in under 60 minutes.
                </p>
              </motion.div>

              {/* Chapter 4: Ready to Wear */}
              <motion.div
                style={{ opacity: ch4Opacity, y: ch4Y }}
                className="absolute inset-0 glass-card p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl"
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.4em] font-mono mb-2 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                  04 / READY TO STEP OUT
                </p>
                <h2 className={`text-2xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-3 sm:mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                  STEP OUT WITH<br />CONFIDENCE.
                </h2>
                <p className={`text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                  Zero hassle. Perfect fit. Ready to wear the moment you unbox.
                </p>
                <div>
                  <MagneticButton className={`text-[11px] sm:text-xs tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 font-mono transition-colors w-full sm:w-auto min-h-[44px] flex items-center justify-center ${
                    isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
                  }`}>
                    GET STARTED NOW →
                  </MagneticButton>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: Authentic Indian Fashion Model Display Card */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <motion.div
              className={`relative w-full max-w-[280px] sm:max-w-md aspect-[3/4] max-h-[38vh] sm:max-h-[55vh] lg:max-h-[70vh] rounded-2xl sm:rounded-3xl overflow-hidden glass-card shadow-2xl ${
                isLight ? 'border-2 border-purple-500/20' : 'border border-purple-400/30'
              }`}
              style={{
                scale: modelScale,
                rotateY: modelRotateY,
                rotateX: modelRotateX,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Primary Authentic Indian Fashion Model Image */}
              <div className="relative w-full h-full bg-neutral-900">
                <Image
                  src="/images/nagpur-indian-model-v4.jpg"
                  alt="Kya Pehnu Authentic Indian Fashion Model"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  priority
                  className="object-cover object-center"
                />

                {/* Secondary Authentic Indian Fashion Model Image on Scroll Crossfade */}
                <motion.div
                  className="absolute inset-0 z-10"
                  style={{ opacity: imageAltOpacity }}
                >
                  <Image
                    src="/images/nagpur-indian-outfit-v4.jpg"
                    alt="Kya Pehnu Authentic Indian Fashion Outfit"
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Subtle Gradient Shadow */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60" />
              </div>

              {/* Floating Live Delivery Badge */}
              <motion.div
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 pointer-events-none"
                style={{ opacity: tagOpacity }}
              >
                <div className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-purple-400/40 text-white font-mono text-[9px] sm:text-[10px] tracking-wider shadow-lg flex items-center gap-1.5 sm:gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>60 MINS IN NAGPUR</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Subtle Bottom Scroll Indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none">
          <div className={`w-px h-6 sm:h-8 overflow-hidden relative ${isLight ? 'bg-purple-300' : 'bg-white/20'}`}>
            <motion.div
              className={`absolute top-0 left-0 right-0 h-1/2 ${isLight ? 'bg-purple-600' : 'bg-white/70'}`}
              animate={{ y: ['0%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <p className={`text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase ${isLight ? 'text-purple-700 font-medium' : 'text-white/30'}`}>
            SCROLL
          </p>
        </div>

      </div>
    </div>
  );
}
