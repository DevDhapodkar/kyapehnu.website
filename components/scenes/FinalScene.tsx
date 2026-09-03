'use client';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function FinalScene() {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-8 py-24">
      <motion.p
        className="text-white/30 text-xs tracking-[0.5em] font-mono mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        READY?
      </motion.p>
      <motion.h2
        className="text-white text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-none mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        YOUR LOOK.<br />60 MINUTES.
      </motion.h2>
      <motion.p
        className="text-white/40 text-base mb-12 max-w-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Download the app and get your first outfit delivered before you finish getting ready.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <MagneticButton className="bg-white text-black text-xs tracking-[0.3em] px-10 py-5 font-mono hover:bg-neutral-200 transition-colors text-sm">
          GET THE APP — IT&apos;S FREE
        </MagneticButton>
      </motion.div>
    </section>
  );
}
