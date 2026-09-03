'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { vibes } from '@/data/vibes';
import type { VibeCategory } from '@/types';

export function Scene03Vibe() {
  const { activeVibe, setActiveVibe, theme } = useApp();
  const current = vibes.find((v) => v.label === activeVibe) ?? vibes[0];
  const isLight = theme === 'light';

  return (
    <section
      id="vibe"
      className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-16 sm:py-24 transition-colors duration-700"
      style={{ background: isLight ? '#f3f4f6' : current.palette.bg }}
    >
      <p className={`text-xs tracking-[0.5em] font-mono mb-8 sm:mb-12 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
        03 / YOUR VIBE
      </p>
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight mb-10 sm:mb-16 text-center ${
        isLight ? 'text-neutral-950' : 'text-white'
      }`}>
        WHAT&apos;S THE OCCASION?
      </h2>
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-2xl">
        {vibes.map(({ label, palette }) => (
          <button
            key={label}
            onClick={() => setActiveVibe(label as VibeCategory)}
            className="text-[11px] sm:text-xs tracking-[0.2em] px-4 sm:px-5 py-3 border font-mono transition-all duration-300 rounded-lg cursor-pointer min-h-[44px] flex items-center justify-center"
            style={{
              borderColor: activeVibe === label ? (isLight ? '#000' : palette.accent) : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'),
              color: activeVibe === label ? (isLight ? '#000' : palette.accent) : (isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)'),
              background: activeVibe === label ? (isLight ? 'rgba(0,0,0,0.06)' : `${palette.accent}15`) : 'transparent',
              fontWeight: activeVibe === label ? '600' : '400',
            }}
            aria-pressed={activeVibe === label}
          >
            {label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeVibe}
          className={`text-xs sm:text-sm mt-8 sm:mt-12 tracking-widest font-mono ${isLight ? 'text-neutral-600' : 'text-white/60'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {activeVibe} SELECTED ✓
        </motion.p>
      </AnimatePresence>
    </section>
  );
}
