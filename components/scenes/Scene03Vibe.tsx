'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { vibes } from '@/data/vibes';
import type { VibeCategory } from '@/types';

export function Scene03Vibe() {
  const { activeVibe, setActiveVibe } = useApp();
  const current = vibes.find((v) => v.label === activeVibe) ?? vibes[0];

  return (
    <section
      id="vibe"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-24 transition-colors duration-700"
      style={{ background: current.palette.bg }}
    >
      <p className="text-white/30 text-xs tracking-[0.5em] font-mono mb-12">03 / YOUR VIBE</p>
      <h2 className="text-white text-4xl md:text-5xl font-thin tracking-tight mb-16 text-center">
        WHAT&apos;S THE OCCASION?
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {vibes.map(({ label, palette }) => (
          <button
            key={label}
            onClick={() => setActiveVibe(label as VibeCategory)}
            className="text-xs tracking-[0.2em] px-5 py-3 border font-mono transition-all duration-300"
            style={{
              borderColor: activeVibe === label ? palette.accent : 'rgba(255,255,255,0.2)',
              color: activeVibe === label ? palette.accent : 'rgba(255,255,255,0.5)',
              background: activeVibe === label ? `${palette.accent}15` : 'transparent',
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
          className="text-white/40 text-sm mt-12 tracking-widest font-mono"
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
