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
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24 transition-colors duration-700"
      style={{ background: isLight ? '#f3f4f6' : current.palette.bg }}
    >
      <p className={`text-xs tracking-[0.5em] font-mono mb-12 ${isLight ? 'text-neutral-500' : 'text-white/30'}`}>
        03 / YOUR VIBE
      </p>
      <h2 className={`text-4xl md:text-5xl font-thin tracking-tight mb-16 text-center ${
        isLight ? 'text-neutral-950' : 'text-white'
      }`}>
        WHAT&apos;S THE OCCASION?
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {vibes.map(({ label, palette }) => (
          <button
            key={label}
            onClick={() => setActiveVibe(label as VibeCategory)}
            className="text-xs tracking-[0.2em] px-5 py-3 border font-mono transition-all duration-300 rounded-lg cursor-pointer"
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
          className={`text-sm mt-12 tracking-widest font-mono ${isLight ? 'text-neutral-500' : 'text-white/40'}`}
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
