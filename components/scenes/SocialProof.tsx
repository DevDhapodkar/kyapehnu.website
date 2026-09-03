'use client';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site.config';

export function SocialProof() {
  const { REVIEWS } = siteConfig;

  return (
    <section className="glass-bg py-24 px-8 md:px-16" style={{ background: '#050508' }}>
      <p className="relative z-10 text-white/30 text-xs tracking-[0.5em] font-mono text-center mb-12">WHAT PEOPLE SAY</p>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            className="glass-card p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, j) => (
                <span key={j} className="text-white/80 text-xs">★</span>
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
            <p className="text-white/30 text-xs font-mono tracking-widest">— {review.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
