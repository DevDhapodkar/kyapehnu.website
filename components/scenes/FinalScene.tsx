'use client';
import { motion } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function FinalScene() {
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-8 py-16 sm:py-24 transition-colors duration-400 ${
      isLight ? 'bg-white text-neutral-900' : 'bg-black text-white'
    }`}>
      <motion.p
        className={`text-xs tracking-[0.5em] font-mono mb-6 sm:mb-8 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        READY?
      </motion.p>
      <motion.h2
        className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-none mb-6 ${
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
        className={`text-xs sm:text-base mb-8 sm:mb-12 max-w-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}
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
        className="w-full sm:w-auto px-4"
      >
        <MagneticButton className={`text-xs tracking-[0.2em] sm:tracking-[0.3em] px-6 sm:px-10 py-4 sm:py-5 font-mono transition-colors min-h-[48px] w-full sm:w-auto flex items-center justify-center ${
          isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
        }`}>
          GET THE APP — IT&apos;S FREE
        </MagneticButton>
      </motion.div>
    </section>
  );
}
