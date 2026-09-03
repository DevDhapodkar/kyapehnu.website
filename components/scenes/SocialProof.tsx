'use client';
import { motion } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { siteConfig } from '@/config/site.config';

export function SocialProof() {
  const { REVIEWS } = siteConfig;
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <section className={`glass-bg py-24 px-8 md:px-16 transition-colors duration-400 ${
      isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-[#050508] text-white'
    }`}>
      <p className={`relative z-10 text-xs tracking-[0.5em] font-mono text-center mb-12 ${
        isLight ? 'text-neutral-500' : 'text-white/30'
      }`}>
        WHAT PEOPLE SAY
      </p>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            className={`glass-card p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
              isLight ? 'bg-white border border-neutral-200 shadow-sm' : 'border border-white/10'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, j) => (
                <span key={j} className={isLight ? 'text-amber-500 text-xs' : 'text-white/80 text-xs'}>★</span>
              ))}
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${isLight ? 'text-neutral-700' : 'text-white/70'}`}>
              &ldquo;{review.text}&rdquo;
            </p>
            <p className={`text-xs font-mono tracking-widest ${isLight ? 'text-neutral-400' : 'text-white/30'}`}>
              — {review.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
