'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Fake progress that caps at 90%, jumps to 100 on completion
    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const fake = Math.min(90, (elapsed / 4000) * 90);
      setProgress(Math.round(fake));
      if (fake < 90) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    // Hard timeout at 5s — jump to 100 and proceed
    const timeout = setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setProgress(100);
      setTimeout(onComplete, 400);
    }, 5000);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-mono text-white/30 text-xs tracking-[0.5em] mb-8">KYA PEHNU?</p>
      <div className="w-48 h-px bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <p className="font-mono text-white/20 text-xs mt-4 tracking-widest">{progress}%</p>
    </motion.div>
  );
}
