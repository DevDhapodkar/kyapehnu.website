'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface ScrollytellingHeroProps {
  className?: string;
}

/* ───────────────────────────────────────────────────────────────
   MOBILE HERO — simple stacked layout, no sticky, no heavy blur
   ─────────────────────────────────────────────────────────────── */
function MobileHero({ isLight }: { isLight: boolean }) {
  const chapters = [
    { tag: '01 / THE SOLUTION', title: 'YOUR LOOK.\n60 MINUTES.', body: 'Discover, personalise, and receive your complete new outfit before your plans begin.' },
    { tag: '02 / CURATED STYLE', title: 'CURATED FOR\nYOUR TONIGHT.', body: 'From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe.' },
    { tag: '03 / ULTRA FAST', title: 'FAST. DIRECT.\nTO YOUR DOOR.', body: 'Delivering across Dharampeth, Sadar, Sitabuldi, IT Park, and all of Nagpur in under 60 minutes.' },
    { tag: '04 / READY TO STEP OUT', title: 'STEP OUT WITH\nCONFIDENCE.', body: 'Zero hassle. Perfect fit. Ready to wear the moment you unbox.' },
  ];

  return (
    <div className={`w-full transition-colors duration-400 ${isLight ? 'bg-[#f8f9fc] text-neutral-900' : 'bg-[#050508] text-white'}`}>
      {/* Static purple ambient glow — no animation, reduced blur for mobile GPU */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/4 -left-20 w-[300px] h-[300px] rounded-full opacity-40"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[280px] h-[280px] rounded-full opacity-35"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* Model image card */}
        <div className="relative z-10 pt-20 pb-6 px-5 flex justify-center">
          <div className={`relative w-full max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ${
            isLight ? 'border-2 border-purple-400/20' : 'border border-purple-400/25'
          }`}>
            <Image
              src="/images/nagpur-indian-model-v4.jpg"
              alt="Kya Pehnu Fashion Model"
              fill
              sizes="90vw"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 z-10">
              <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-purple-400/30 text-white font-mono text-[9px] tracking-wider flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>60 MINS IN NAGPUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters as stacked cards */}
      <div className="px-5 pb-8 space-y-5">
        {chapters.map((ch, i) => (
          <motion.div
            key={i}
            className={`p-5 rounded-2xl ${
              isLight
                ? 'bg-white/80 border border-purple-200/40 shadow-sm'
                : 'bg-white/5 border border-purple-400/15'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <p className={`text-[10px] tracking-[0.4em] font-mono mb-2 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
              {ch.tag}
            </p>
            <h2 className={`text-2xl font-thin tracking-tight leading-tight mb-2 whitespace-pre-line ${isLight ? 'text-neutral-950' : 'text-white'}`}>
              {ch.title}
            </h2>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
              {ch.body}
            </p>
            {(i === 0 || i === 3) && (
              <div className="mt-4">
                <button className={`text-[11px] tracking-widest px-6 py-3 font-mono transition-colors w-full min-h-[44px] rounded-lg ${
                  isLight ? 'bg-neutral-900 text-white active:bg-neutral-700' : 'bg-white text-black active:bg-neutral-200'
                }`}>
                  {i === 0 ? 'EXPLORE OUTFITS ↓' : 'GET STARTED NOW →'}
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   DESKTOP HERO — full sticky scrollytelling with blobs & 3D card
   ──────────────────────────────────────────────────────────────── */
export function ScrollytellingHero({ className = '' }: ScrollytellingHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useApp();
  const isLight = theme === 'light';
  const isMobile = useMobileDetect();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200, mass: 0.2 });

  const modelScale = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1, 1.12, 1.06, 1.02]);
  const modelRotateY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, -8, 10, 0]);
  const modelRotateX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0, 4, -4, 0]);
  const imageAltOpacity = useTransform(smoothProgress, [0.55, 0.8], [0, 1]);

  const ch1Opacity = useTransform(smoothProgress, [0, 0.2, 0.28], [1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0, 0.25], [0, -30]);
  const ch2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.25, 0.35, 0.48, 0.55], [30, 0, 0, -30]);
  const ch3Opacity = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [0, 1, 1, 0]);
  const ch3Y = useTransform(smoothProgress, [0.52, 0.6, 0.73, 0.8], [30, 0, 0, -30]);
  const ch4Opacity = useTransform(smoothProgress, [0.78, 0.88, 1], [0, 1, 1]);
  const ch4Y = useTransform(smoothProgress, [0.78, 0.88, 1], [30, 0, 0]);
  const tagOpacity = useTransform(smoothProgress, [0.45, 0.6, 0.85], [0, 1, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
  };

  // On mobile, render a simple stacked layout
  if (isMobile) {
    return <MobileHero isLight={isLight} />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative h-[300vh] w-full transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fc] text-neutral-900' : 'bg-[#050508] text-white'
      } ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-8 md:px-12 pt-20 pb-8">
        
        {/* Purple floating blobs — desktop only */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[160px] opacity-35 transition-all duration-700"
            style={{
              background: isLight
                ? 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(129,140,248,0.12) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(147,51,234,0.35) 0%, rgba(124,58,237,0.18) 50%, transparent 75%)',
              transform: `translate(calc(-50% + ${mousePos.x * 35}px), calc(-50% + ${mousePos.y * 35}px))`,
            }}
          />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto h-full grid grid-cols-12 gap-12 items-center">
          
          {/* Left: Scrollytelling text cards */}
          <div className="col-span-6 flex flex-col justify-center">
            <div className="relative w-full max-w-xl">
              <motion.div style={{ opacity: ch1Opacity, y: ch1Y }} className="glass-card p-10 rounded-3xl shadow-2xl">
                <p className={`text-xs tracking-[0.4em] font-mono mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>01 / THE SOLUTION</p>
                <h1 className={`text-5xl md:text-6xl font-thin tracking-tight leading-none mb-6 ${isLight ? 'text-neutral-950' : 'text-white'}`}>YOUR LOOK.<br />60 MINUTES.</h1>
                <p className={`text-sm md:text-base mb-8 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Discover, personalise, and receive your complete new outfit before your plans begin.</p>
                <MagneticButton className={`text-xs tracking-widest px-8 py-4 font-mono transition-colors ${isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'}`}>EXPLORE OUTFITS ↓</MagneticButton>
              </motion.div>

              <motion.div style={{ opacity: ch2Opacity, y: ch2Y }} className="absolute inset-0 glass-card p-10 rounded-3xl shadow-2xl">
                <p className={`text-xs tracking-[0.4em] font-mono mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>02 / CURATED STYLE</p>
                <h2 className={`text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>CURATED FOR<br />YOUR TONIGHT.</h2>
                <p className={`text-sm md:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>From street style to sleek evening wear, get complete head-to-toe fits curated for your exact vibe.</p>
              </motion.div>

              <motion.div style={{ opacity: ch3Opacity, y: ch3Y }} className="absolute inset-0 glass-card p-10 rounded-3xl shadow-2xl">
                <p className={`text-xs tracking-[0.4em] font-mono mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>03 / ULTRA FAST</p>
                <h2 className={`text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>FAST. DIRECT.<br />TO YOUR DOOR.</h2>
                <p className={`text-sm md:text-base leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Delivering across Dharampeth, Sadar, Sitabuldi, IT Park, and all of Nagpur in under 60 minutes.</p>
              </motion.div>

              <motion.div style={{ opacity: ch4Opacity, y: ch4Y }} className="absolute inset-0 glass-card p-10 rounded-3xl shadow-2xl">
                <p className={`text-xs tracking-[0.4em] font-mono mb-3 uppercase ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>04 / READY TO STEP OUT</p>
                <h2 className={`text-4xl md:text-5xl font-thin tracking-tight leading-tight mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>STEP OUT WITH<br />CONFIDENCE.</h2>
                <p className={`text-sm md:text-base mb-6 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>Zero hassle. Perfect fit. Ready to wear the moment you unbox.</p>
                <MagneticButton className={`text-xs tracking-widest px-8 py-4 font-mono transition-colors ${isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'}`}>GET STARTED NOW →</MagneticButton>
              </motion.div>
            </div>
          </div>

          {/* Right: Model image card */}
          <div className="col-span-6 flex justify-center">
            <motion.div
              className={`relative w-full max-w-md aspect-[3/4] max-h-[70vh] rounded-3xl overflow-hidden glass-card shadow-2xl ${
                isLight ? 'border-2 border-purple-500/20' : 'border border-purple-400/30'
              }`}
              style={{ scale: modelScale, rotateY: modelRotateY, rotateX: modelRotateX, transformStyle: 'preserve-3d' }}
            >
              <div className="relative w-full h-full bg-neutral-900">
                <Image src="/images/nagpur-indian-model-v4.jpg" alt="Kya Pehnu Fashion Model" fill sizes="45vw" priority className="object-cover object-center" />
                <motion.div className="absolute inset-0 z-10" style={{ opacity: imageAltOpacity }}>
                  <Image src="/images/nagpur-indian-outfit-v4.jpg" alt="Kya Pehnu Fashion Outfit" fill sizes="45vw" className="object-cover object-center" />
                </motion.div>
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60" />
              </div>
              <motion.div className="absolute top-4 right-4 z-30 pointer-events-none" style={{ opacity: tagOpacity }}>
                <div className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-purple-400/40 text-white font-mono text-[10px] tracking-wider shadow-lg flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>60 MINS IN NAGPUR</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-none">
          <div className={`w-px h-8 overflow-hidden relative ${isLight ? 'bg-purple-300' : 'bg-white/20'}`}>
            <motion.div className={`absolute top-0 left-0 right-0 h-1/2 ${isLight ? 'bg-purple-600' : 'bg-white/70'}`} animate={{ y: ['0%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
          </div>
          <p className={`text-[9px] tracking-[0.25em] font-mono uppercase ${isLight ? 'text-purple-700 font-medium' : 'text-white/30'}`}>SCROLL</p>
        </div>
      </div>
    </div>
  );
}
