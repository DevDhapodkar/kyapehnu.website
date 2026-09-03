'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

const CARDS = [
  'KYA PEHNU?',
  'WHAT ARE YOU WEARING TONIGHT?',
  "DON'T KNOW?",
  "WE'LL FIX THAT.",
  'NEW OUTFIT. UNDER 60 MINUTES.',
];

interface CinematicIntroProps {
  onEnter: () => void;
}

export function CinematicIntro({ onEnter }: CinematicIntroProps) {
  const [step, setStep] = useState(0);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    if (step < CARDS.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 800 : 1400);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCta(true), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          className="text-white text-3xl md:text-5xl lg:text-6xl font-thin tracking-[0.15em] text-center px-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {CARDS[step]}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence>
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-16"
          >
            <MagneticButton
              className="border border-white text-white text-xs tracking-[0.3em] px-8 py-4 hover:bg-white hover:text-black transition-colors font-mono"
              onClick={onEnter}
            >
              ENTER EXPERIENCE →
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
