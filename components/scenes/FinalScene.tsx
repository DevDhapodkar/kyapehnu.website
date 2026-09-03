'use client';
import { motion } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function FinalScene() {
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center text-center px-8 py-24 transition-colors duration-400 ${
      isLight ? 'bg-white text-neutral-900' : 'bg-black text-white'
    }`}>
      <motion.p
        className={`text-xs tracking-[0.5em] font-mono mb-8 ${isLight ? 'text-neutral-500' : 'text-white/30'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        READY?
      </motion.p>
      <motion.h2
        className={`text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-none mb-6 ${
          isLight ? 'text-neutral-950' : 'text-white'
        }`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        YOUR LOOK.<br />60 MINUTES.
      </motion.h2>
      <motion.p
        className={`text-base mb-12 max-w-sm ${isLight ? 'text-neutral-600' : 'text-white/40'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Download the app and get your first outfit delivered in Nagpur before you finish getting ready.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <MagneticButton className={`text-xs tracking-[0.3em] px-10 py-5 font-mono transition-colors text-sm ${
          isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
        }`}>
          GET THE APP — IT&apos;S FREE
        </MagneticButton>
      </motion.div>
    </section>
  );
}
