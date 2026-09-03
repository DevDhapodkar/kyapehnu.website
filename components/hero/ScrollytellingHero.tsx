'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface ScrollytellingHeroProps {
  className?: string;
}

export function ScrollytellingHero({ className = '' }: ScrollytellingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';
  const isMobile = useMobileDetect();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.2 });

  // Image transforms — skip 3D rotation on mobile for performance
  const modelScale = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1, 1.08, 1.04, 1]);
  const modelRotateY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], isMobile ? [0, 0, 0, 0] : [0, -8, 10, 0]);
  const modelRotateX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], isMobile ? [0, 0, 0, 0] : [0, 4, -4, 0]);
  const imageAltOpacity = useTransform(smoothProgress, [0.55, 0.8], [0, 1]);

  // Chapter opacities & Y — same on both mobile and desktop
  const ch1Opacity = useTransform(smoothProgress, [0, 0.2, 0.28], [1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0, 0.25], [0, -30]);
  const ch2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [30, 0, 0, -30]);
  const ch3Opacity = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [0, 1, 1, 0]);
  const ch3Y = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [30, 0, 0, -30]);
  const ch4Opacity = useTransform(smoothProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const ch4Y = useTransform(smoothProgress, [0.78, 0.88, 1], [30, 0, 0]);
  const tagOpacity = useTransform(smoothProgress, [0.45, 0.6, 0.85], [0, 1, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[300vh] w-full transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fc] text-neutral-900' : 'bg-[#050508] text-white'
      } ${className}`}
    >
      {/* Sticky viewport canvas */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-4 sm:pb-8">

        {/* ── Background blobs: static on mobile, animated on desktop ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {isMobile ? (
            /* Mobile: static purple glow — no animation, reduced blur */
            <>
              <div
                className="absolute top-[20%] -left-[10%] w-[280px] h-[280px] rounded-full opacity-50"
                style={{
                  background: isLight
                    ? 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                }}
              />
              <div
                className="absolute bottom-[20%] -right-[10%] w-[250px] h-[250px] rounded-full opacity-40"
                style={{
                  background: isLight
                    ? 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                }}
              />
            </>
          ) : (
            /* Desktop: animated blobs with heavy blur */
            <>
              <motion.div
                className="absolute top-1/4 left-[15%] w-[650px] h-[650px] rounded-full blur-[140px]"
                style={{
                  background: isLight
                    ? 'radial-gradient(circle, rgba(147,51,234,0.28) 0%, rgba(168,85,247,0.15) 50%, transparent 75%)'
                    : 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(139,92,246,0.2) 50%, transparent 75%)',
                }}
                animate={{ x: [0, 40, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.95, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-1/4 right-[15%] w-[600px] h-[600px] rounded-full blur-[140px]"
                style={{
                  background: isLight
                    ? 'radial-gradient(circle, rgba(236,72,153,0.24) 0%, rgba(217,70,239,0.14) 50%, transparent 75%)'
                    : 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, rgba(192,38,211,0.18) 50%, transparent 75%)',
                }}
                animate={{ x: [0, -45, 35, 0], y: [0, 40, -40, 0], scale: [1, 0.92, 1.12, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </>
          )}
        </div>

        {/* ── Main layout: stacked on mobile, side-by-side on desktop ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 items-center">

          {/* Image card — on mobile it sits at the top, smaller */}
          <div className="lg:col-span-6 flex justify-center lg:order-2 flex-shrink-0 mb-4 lg:mb-0">
            <motion.div
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${
                isLight ? 'border-2 border-purple-500/20' : 'border border-purple-400/30'
              }`}
              style={{
                width: isMobile ? '55vw' : '100%',
                maxWidth: isMobile ? '220px' : '28rem',
                aspectRatio: '3/4',
                maxHeight: isMobile ? '35vh' : '70vh',
                scale: modelScale,
                rotateY: modelRotateY,
                rotateX: modelRotateX,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative w-full h-full bg-neutral-900">
                <Image src="/images/nagpur-indian-model-v4.jpg" alt="Kya Pehnu Fashion Model" fill sizes={isMobile ? '55vw' : '45vw'} priority className="object-cover object-center" />
                <motion.div className="absolute inset-0 z-10" style={{ opacity: imageAltOpacity }}>
                  <Image src="/images/nagpur-indian-outfit-v4.jpg" alt="Kya Pehnu Fashion Outfit" fill sizes={isMobile ? '55vw' : '45vw'} className="object-cover object-center" />
                </motion.div>
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-black/15 opacity-60" />
              </div>
              <motion.div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 pointer-events-none" style={{ opacity: tagOpacity }}>
                <div className="px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-purple-400/30 text-white font-mono text-[8px] sm:text-[10px] tracking-wider shadow-lg flex items-center gap-1 sm:gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>60 MINS IN NAGPUR</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Text chapters — scroll-driven crossfade on both mobile and desktop */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:order-1 flex-1 min-h-0 w-full">
            <div className="relative w-full max-w-xl mx-auto lg:mx-0" style={{ minHeight: isMobile ? '180px' : '280px' }}>

              {/* Ch 1 */}
              <motion.div
                style={{ opacity: ch1Opacity, y: ch1Y }}
                className={`${isMobile ? '' : 'glass-card'} p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl ${
                  isMobile ? (isLight ? 'bg-white/70 border border-purple-200/30 shadow-md' : 'bg-white/5 border border-purple-400/15 shadow-lg') : 'shadow-2xl'
                }`}
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-mono mb-1.5 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>01 / THE SOLUTION</p>
                <h1 className={`text-2xl sm:text-5xl md:text-6xl font-thin tracking-tight leading-none mb-2 sm:mb-6 ${isLight ? 'text-neutral-950' : 'text-white'}`}>YOUR LOOK.<br />60 MINUTES.</h1>
                <p className={`text-[11px] sm:text-sm md:text-base mb-3 sm:mb-8 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Discover, personalise, and receive your complete new outfit before your plans begin.</p>
                <MagneticButton className={`text-[10px] sm:text-xs tracking-widest px-5 sm:px-8 py-3 sm:py-4 font-mono transition-colors w-full sm:w-auto min-h-[40px] sm:min-h-[44px] ${isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'}`}>EXPLORE OUTFITS ↓</MagneticButton>
              </motion.div>

              {/* Ch 2 */}
              <motion.div
                style={{ opacity: ch2Opacity, y: ch2Y }}
                className={`absolute inset-0 ${isMobile ? '' : 'glass-card'} p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl ${
                  isMobile ? (isLight ? 'bg-white/70 border border-purple-200/30 shadow-md' : 'bg-white/5 border border-purple-400/15 shadow-lg') : 'shadow-2xl'
                }`}
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-mono mb-1.5 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>02 / CURATED STYLE</p>
                <h2 className={`text-xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-2 sm:mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>CURATED FOR<br />YOUR TONIGHT.</h2>
                <p className={`text-[11px] sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe.</p>
              </motion.div>

              {/* Ch 3 */}
              <motion.div
                style={{ opacity: ch3Opacity, y: ch3Y }}
                className={`absolute inset-0 ${isMobile ? '' : 'glass-card'} p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl ${
                  isMobile ? (isLight ? 'bg-white/70 border border-purple-200/30 shadow-md' : 'bg-white/5 border border-purple-400/15 shadow-lg') : 'shadow-2xl'
                }`}
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-mono mb-1.5 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>03 / ULTRA FAST</p>
                <h2 className={`text-xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-2 sm:mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>FAST. DIRECT.<br />TO YOUR DOOR.</h2>
                <p className={`text-[11px] sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Delivering across Dharampeth, Sadar, Sitabuldi, IT Park, and all of Nagpur in under 60 minutes.</p>
              </motion.div>

              {/* Ch 4 */}
              <motion.div
                style={{ opacity: ch4Opacity, y: ch4Y }}
                className={`absolute inset-0 ${isMobile ? '' : 'glass-card'} p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl ${
                  isMobile ? (isLight ? 'bg-white/70 border border-purple-200/30 shadow-md' : 'bg-white/5 border border-purple-400/15 shadow-lg') : 'shadow-2xl'
                }`}
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-mono mb-1.5 sm:mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>04 / READY TO STEP OUT</p>
                <h2 className={`text-xl sm:text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-2 sm:mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>STEP OUT WITH<br />CONFIDENCE.</h2>
                <p className={`text-[11px] sm:text-sm md:text-base mb-3 sm:mb-6 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Zero hassle. Perfect fit. Ready to wear the moment you unbox.</p>
                <MagneticButton className={`text-[10px] sm:text-xs tracking-widest px-5 sm:px-8 py-3 sm:py-4 font-mono transition-colors w-full sm:w-auto min-h-[40px] sm:min-h-[44px] ${isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'}`}>GET STARTED NOW →</MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none">
          <div className={`w-px h-6 sm:h-8 overflow-hidden relative ${isLight ? 'bg-purple-300' : 'bg-white/20'}`}>
            <motion.div className={`absolute top-0 left-0 right-0 h-1/2 ${isLight ? 'bg-purple-600' : 'bg-white/70'}`} animate={{ y: ['0%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
          </div>
          <p className={`text-[8px] sm:text-[9px] tracking-[0.25em] font-mono uppercase ${isLight ? 'text-purple-700 font-medium' : 'text-white/30'}`}>SCROLL</p>
        </div>
      </div>
    </div>
  );
}
