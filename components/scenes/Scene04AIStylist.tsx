'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOutfit } from '@/data/outfits';
import { gsap } from '@/lib/gsap';

const DESTINATIONS = ['date', 'party', 'office', 'college', 'casual', 'street', 'weekend'];
const STYLES = ['minimal', 'bold', 'classic', 'streetwear', 'casual', 'formal'];

export function Scene04AIStylist() {
  const [dest, setDest] = useState('');
  const [style, setStyle] = useState('');
  const [revealed, setRevealed] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const outfit = dest && style ? getOutfit(dest, style) : null;

  useEffect(() => {
    if (outfit && cardsRef.current) {
      setRevealed(true);
      const cards = cardsRef.current.querySelectorAll('.product-card');
      gsap.from(cards, { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out' });
    }
  }, [dest, style]);

  return (
    <section id="stylist" className="min-h-screen bg-neutral-950 px-8 md:px-16 py-24">
      <p className="text-white/30 text-xs tracking-[0.5em] font-mono mb-8">04 / AI STYLIST</p>
      <h2 className="text-white text-4xl md:text-5xl font-thin tracking-tight mb-4">WHERE ARE YOU GOING?</h2>
      <p className="text-white/40 text-sm mb-12">Tell us your destination and style. We&apos;ll build your look.</p>

      <div className="flex flex-col gap-10 mb-16">
        <div>
          <p className="text-white/40 text-xs tracking-widest font-mono mb-4">DESTINATION</p>
          <div className="flex flex-wrap gap-3">
            {DESTINATIONS.map((d) => (
              <button
                key={d}
                onClick={() => { setDest(d); setRevealed(false); }}
                className="text-xs tracking-widest px-4 py-2 border font-mono transition-all"
                style={{
                  borderColor: dest === d ? '#fff' : 'rgba(255,255,255,0.2)',
                  color: dest === d ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
                aria-pressed={dest === d}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-white/40 text-xs tracking-widest font-mono mb-4">YOUR STYLE</p>
          <div className="flex flex-wrap gap-3">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => { setStyle(s); setRevealed(false); }}
                className="text-xs tracking-widest px-4 py-2 border font-mono transition-all"
                style={{
                  borderColor: style === s ? '#fff' : 'rgba(255,255,255,0.2)',
                  color: style === s ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
                aria-pressed={style === s}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {outfit && revealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-6 mb-8">
              <p className="text-white/50 text-sm font-mono">YOUR LOOK</p>
              <p className="text-white text-sm font-mono">₹{outfit.totalPrice.toLocaleString('en-IN')}</p>
              <p className="text-white/40 text-xs font-mono">⚡ {outfit.deliveryEta}</p>
            </div>
            <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {outfit.products.map((p) => (
                <div key={p.id} className="product-card border border-white/10 p-4 hover:border-white/30 transition-colors">
                  <div className="aspect-[3/4] bg-neutral-800 mb-4 flex items-center justify-center">
                    <span className="text-white/20 text-xs font-mono">{p.category.toUpperCase()}</span>
                  </div>
                  <p className="text-white text-sm mb-1">{p.name}</p>
                  <p className="text-white/40 text-xs font-mono">{p.brand} · ₹{p.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
            <button className="mt-8 bg-white text-black text-xs tracking-widest px-8 py-4 font-mono hover:bg-neutral-200 transition-colors">
              ORDER THIS LOOK →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
