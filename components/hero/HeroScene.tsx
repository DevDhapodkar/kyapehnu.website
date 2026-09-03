'use client';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

import { ParallaxHeroViewer } from './ParallaxHeroViewer';

interface HeroSceneProps {
  modelPath?: string | null;
}

export function HeroScene({ modelPath }: HeroSceneProps) {
  return (
    <section id="hero" className="glass-bg relative w-full h-screen overflow-hidden" style={{ background: '#050508' }}>
      <ParallaxHeroViewer
        className="absolute inset-0 w-full h-full"
        imageSrc="/images/hero-model.jpg"
      />
      {/* Hero copy overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-md glass-card rounded-2xl p-8"
          style={{}}
        >
          <p className="text-white/40 text-xs tracking-[0.5em] mb-4 font-mono">FASHION. FAST.</p>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-none mb-6">
            YOUR LOOK.<br />60 MINUTES.
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-sm mb-8">
            Discover, personalise, and receive your new outfit before your plans begin.
          </p>
          <div className="pointer-events-auto">
            <MagneticButton
              className="bg-white text-black text-xs tracking-widest px-8 py-4 font-mono hover:bg-neutral-200 transition-colors"
            >
              DISCOVER YOUR LOOK ↓
            </MagneticButton>
          </div>
        </motion.div>
      </div>
      {/* Scroll indicator — bottom left, away from model */}
      <motion.div
        className="absolute bottom-8 left-8 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-12 bg-white/20 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-white/60"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <p className="text-white/30 text-xs tracking-widest font-mono">SCROLL</p>
      </motion.div>
    </section>
  );
}
