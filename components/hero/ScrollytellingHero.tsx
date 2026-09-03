'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ScrollytellingHeroProps {
  className?: string;
}

export function ScrollytellingHero({ className = '' }: ScrollytellingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';

  // Scroll Progress across 260vh container for smooth, responsive pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Direct, smooth transforms (hardware-accelerated, zero lag on mobile touch)
  const modelScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1, 1.06, 1.03, 1]);
  const imageAltOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const tagOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.85], [0, 1, 1]);

  // Seamless chapter crossfades with zero blank/empty gaps
  // Chapter 1: 0% -> 28%
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0, 0.28], [0, -18]);
  const ch1Pointer = useTransform(scrollYProgress, (v) => (v < 0.25 ? 'auto' : 'none'));

  // Chapter 2: 22% -> 58%
  const ch2Opacity = useTransform(scrollYProgress, [0.22, 0.30, 0.50, 0.58], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.22, 0.30, 0.50, 0.58], [18, 0, 0, -18]);

  // Chapter 3: 52% -> 85%
  const ch3Opacity = useTransform(scrollYProgress, [0.52, 0.60, 0.78, 0.85], [0, 1, 1, 0]);
  const ch3Y = useTransform(scrollYProgress, [0.52, 0.60, 0.78, 0.85], [18, 0, 0, -18]);

  // Chapter 4: 78% -> 100%
  const ch4Opacity = useTransform(scrollYProgress, [0.78, 0.86, 1], [0, 1, 1]);
  const ch4Y = useTransform(scrollYProgress, [0.78, 0.86, 1], [18, 0, 0]);
  const ch4Pointer = useTransform(scrollYProgress, (v) => (v > 0.80 ? 'auto' : 'none'));

  const scrollToShop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative h-[260vh] w-full transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fc] text-neutral-900' : 'bg-[#050508] text-white'
      } ${className}`}
    >
      {/* Sticky Full Viewport Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-4 sm:pb-8">

        {/* ── Background Ambient Purple Glow (Smooth, Low GPU Overhead) ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Mobile Glow: Static lightweight blur */}
          <div
            className="block lg:hidden absolute top-1/4 -left-16 w-72 h-72 rounded-full opacity-40 blur-[45px]"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
            }}
          />
          <div
            className="block lg:hidden absolute bottom-1/4 -right-16 w-72 h-72 rounded-full opacity-35 blur-[45px]"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(217,70,239,0.35) 0%, transparent 70%)',
            }}
          />

          {/* Desktop Glow: Ambient mesh */}
          <div
            className="hidden lg:block absolute top-1/4 left-[15%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-35"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(139,92,246,0.2) 50%, transparent 75%)',
            }}
          />
          <div
            className="hidden lg:block absolute bottom-1/4 right-[15%] w-[550px] h-[550px] rounded-full blur-[120px] opacity-30"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, rgba(217,70,239,0.15) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, rgba(192,38,211,0.18) 50%, transparent 75%)',
            }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* ── Main Layout: Stacked on Mobile, Side-by-Side on Desktop ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 items-center justify-center">

          {/* IMAGE CONTAINER: Always prominent, centered, high quality */}
          <div className="lg:col-span-6 flex justify-center lg:order-2 flex-shrink-0 mb-3 sm:mb-4 lg:mb-0">
            <motion.div
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${
                isLight ? 'border-2 border-purple-500/25' : 'border border-purple-400/30'
              }`}
              style={{
                scale: modelScale,
                willChange: 'transform',
              }}
            >
              {/* Responsive Image Card Box */}
              <div className="relative w-[72vw] max-w-[290px] sm:max-w-[340px] lg:max-w-md aspect-[3/4] max-h-[42vh] sm:max-h-[48vh] lg:max-h-[68vh] bg-neutral-900">
                {/* Primary Authentic Indian Fashion Model Image */}
                <Image
                  src="/images/nagpur-indian-model-v4.jpg"
                  alt="Kya Pehnu Fashion Model"
                  fill
                  sizes="(max-width: 768px) 75vw, 45vw"
                  priority
                  className="object-cover object-center"
                />

                {/* Secondary Indian Fashion Outfit Image on Scroll Crossfade */}
                <motion.div
                  className="absolute inset-0 z-10"
                  style={{ opacity: imageAltOpacity }}
                >
                  <Image
                    src="/images/nagpur-indian-outfit-v4.jpg"
                    alt="Kya Pehnu Fashion Outfit"
                    fill
                    sizes="(max-width: 768px) 75vw, 45vw"
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-black/15 opacity-60 pointer-events-none" />

                {/* Live Delivery Status Badge */}
                <motion.div
                  className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 pointer-events-none"
                  style={{ opacity: tagOpacity }}
                >
                  <div className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-purple-400/40 text-white font-mono text-[9px] sm:text-[10px] tracking-wider shadow-lg flex items-center gap-1.5 sm:gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>60 MINS IN NAGPUR</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* CHAPTER CONTAINER: Solid permanent card container — ZERO EMPTY SPACE */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:order-1 w-full max-w-xl mx-auto lg:mx-0">
            <div
              className={`relative w-full h-[200px] sm:h-[225px] lg:h-[270px] rounded-2xl sm:rounded-3xl border shadow-xl overflow-hidden transition-colors ${
                isLight
                  ? 'bg-white/90 border-purple-200/60 shadow-purple-500/5'
                  : 'bg-[#0f0f15]/80 border-purple-400/20 shadow-purple-900/10'
              }`}
            >
              {/* Chapter 1: The Solution */}
              <motion.div
                style={{
                  opacity: ch1Opacity,
                  y: ch1Y,
                  pointerEvents: ch1Pointer,
                }}
                className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
              >
                <div>
                  <p className={`text-[10px] sm:text-xs tracking-[0.35em] font-mono mb-1 sm:mb-2 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                    01 / THE SOLUTION
                  </p>
                  <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-thin tracking-tight leading-tight mb-1.5 sm:mb-3 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                    YOUR LOOK.<br />60 MINUTES.
                  </h1>
                  <p className={`text-[11px] sm:text-sm lg:text-base leading-relaxed line-clamp-2 ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                    Discover, personalise, and receive your complete new outfit before your plans begin.
                  </p>
                </div>
                <div>
                  <button
                    onClick={scrollToShop}
                    className={`text-[10px] sm:text-xs tracking-widest px-5 sm:px-7 py-2.5 sm:py-3.5 font-mono transition-colors rounded-lg w-full sm:w-auto min-h-[40px] sm:min-h-[44px] flex items-center justify-center cursor-pointer ${
                      isLight
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    EXPLORE OUTFITS ↓
                  </button>
                </div>
              </motion.div>

              {/* Chapter 2: Curated Style */}
              <motion.div
                style={{ opacity: ch2Opacity, y: ch2Y }}
                className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-center pointer-events-none"
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.35em] font-mono mb-1 sm:mb-2 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                  02 / CURATED STYLE
                </p>
                <h2 className={`text-xl sm:text-3xl lg:text-4xl font-thin tracking-tight leading-tight mb-2 sm:mb-3 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                  CURATED FOR<br />YOUR TONIGHT.
                </h2>
                <p className={`text-[11px] sm:text-sm lg:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                  From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe in Nagpur.
                </p>
              </motion.div>

              {/* Chapter 3: Express Dispatch */}
              <motion.div
                style={{ opacity: ch3Opacity, y: ch3Y }}
                className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-center pointer-events-none"
              >
                <p className={`text-[10px] sm:text-xs tracking-[0.35em] font-mono mb-1 sm:mb-2 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                  03 / ULTRA FAST
                </p>
                <h2 className={`text-xl sm:text-3xl lg:text-4xl font-thin tracking-tight leading-tight mb-2 sm:mb-3 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                  FAST. DIRECT.<br />TO YOUR DOOR.
                </h2>
                <p className={`text-[11px] sm:text-sm lg:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                  Delivering across Dharampeth, Sadar, Sitabuldi, IT Park, and all of Nagpur in under 60 minutes.
                </p>
              </motion.div>

              {/* Chapter 4: Ready to Wear */}
              <motion.div
                style={{
                  opacity: ch4Opacity,
                  y: ch4Y,
                  pointerEvents: ch4Pointer,
                }}
                className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
              >
                <div>
                  <p className={`text-[10px] sm:text-xs tracking-[0.35em] font-mono mb-1 sm:mb-2 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
                    04 / READY TO STEP OUT
                  </p>
                  <h2 className={`text-xl sm:text-3xl lg:text-4xl font-thin tracking-tight leading-tight mb-1.5 sm:mb-2 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
                    STEP OUT WITH<br />CONFIDENCE.
                  </h2>
                  <p className={`text-[11px] sm:text-sm lg:text-base leading-relaxed line-clamp-2 ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
                    Zero hassle. Perfect fit. Ready to wear the moment you unbox.
                  </p>
                </div>
                <div>
                  <button
                    onClick={scrollToShop}
                    className={`text-[10px] sm:text-xs tracking-widest px-5 sm:px-7 py-2.5 sm:py-3.5 font-mono transition-colors rounded-lg w-full sm:w-auto min-h-[40px] sm:min-h-[44px] flex items-center justify-center cursor-pointer ${
                      isLight
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    GET STARTED NOW →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Subtle Bottom Scroll Indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none">
          <div className={`w-px h-5 sm:h-7 overflow-hidden relative ${isLight ? 'bg-purple-300' : 'bg-white/20'}`}>
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
