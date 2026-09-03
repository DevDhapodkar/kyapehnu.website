'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { getOutfit } from '@/data/outfits';
import { gsap } from '@/lib/gsap';

const DESTINATIONS = ['date', 'party', 'office', 'college', 'casual', 'street', 'weekend'];
const STYLES = ['minimal', 'bold', 'classic', 'streetwear', 'casual', 'formal'];

export function Scene04AIStylist() {
  const [dest, setDest] = useState('');
  const [style, setStyle] = useState('');
  const [revealed, setRevealed] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';

  const outfit = dest && style ? getOutfit(dest, style) : null;

  useEffect(() => {
    if (outfit && cardsRef.current) {
      setRevealed(true);
      const cards = cardsRef.current.querySelectorAll('.product-card');
      gsap.from(cards, { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out' });
    }
  }, [dest, style]);

  return (
    <section
      id="stylist"
      className={`min-h-screen px-8 md:px-16 py-24 transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-neutral-950 text-white'
      }`}
    >
      <p className={`text-xs tracking-[0.5em] font-mono mb-8 ${isLight ? 'text-neutral-500' : 'text-white/30'}`}>
        04 / OUTFIT CURATOR
      </p>
      <h2 className={`text-4xl md:text-5xl font-thin tracking-tight mb-4 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
        WHERE ARE YOU GOING?
      </h2>
      <p className={`text-sm mb-12 ${isLight ? 'text-neutral-600' : 'text-white/40'}`}>
        Tell us your destination and style. We&apos;ll build your look.
      </p>

      <div className="flex flex-col gap-10 mb-16">
        <div>
          <p className={`text-xs tracking-widest font-mono mb-4 ${isLight ? 'text-neutral-500' : 'text-white/40'}`}>
            DESTINATION
          </p>
          <div className="flex flex-wrap gap-3">
            {DESTINATIONS.map((d) => (
              <button
                key={d}
                onClick={() => { setDest(d); setRevealed(false); }}
                className="text-xs tracking-widest px-4 py-2 border font-mono transition-all rounded-md cursor-pointer"
                style={{
                  borderColor: dest === d ? (isLight ? '#000' : '#fff') : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'),
                  color: dest === d ? (isLight ? '#000' : '#fff') : (isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)'),
                  background: dest === d ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)') : 'transparent',
                }}
                aria-pressed={dest === d}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className={`text-xs tracking-widest font-mono mb-4 ${isLight ? 'text-neutral-500' : 'text-white/40'}`}>
            YOUR STYLE
          </p>
          <div className="flex flex-wrap gap-3">
            {STYLES.map((s) => (
              <button
                key={s}
                onClick={() => { setStyle(s); setRevealed(false); }}
                className="text-xs tracking-widest px-4 py-2 border font-mono transition-all rounded-md cursor-pointer"
                style={{
                  borderColor: style === s ? (isLight ? '#000' : '#fff') : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'),
                  color: style === s ? (isLight ? '#000' : '#fff') : (isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)'),
                  background: style === s ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)') : 'transparent',
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
            <div className="flex items-center gap-6 mb-8 font-mono">
              <p className={`text-sm ${isLight ? 'text-neutral-600' : 'text-white/50'}`}>YOUR LOOK</p>
              <p className={`text-sm font-semibold ${isLight ? 'text-neutral-900' : 'text-white'}`}>₹{outfit.totalPrice.toLocaleString('en-IN')}</p>
              <p className={`text-xs ${isLight ? 'text-neutral-500' : 'text-white/40'}`}>⚡ {outfit.deliveryEta}</p>
            </div>
            <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {outfit.products.map((p) => (
                <div
                  key={p.id}
                  className={`product-card p-4 rounded-xl transition-all ${
                    isLight
                      ? 'bg-white border border-neutral-200 shadow-sm hover:shadow-md'
                      : 'border border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className={`aspect-[3/4] mb-4 flex items-center justify-center rounded-lg ${
                    isLight ? 'bg-neutral-100' : 'bg-neutral-800'
                  }`}>
                    <span className={`text-xs font-mono ${isLight ? 'text-neutral-400' : 'text-white/20'}`}>
                      {p.category.toUpperCase()}
                    </span>
                  </div>
                  <p className={`text-sm font-medium mb-1 ${isLight ? 'text-neutral-900' : 'text-white'}`}>{p.name}</p>
                  <p className={`text-xs font-mono ${isLight ? 'text-neutral-500' : 'text-white/40'}`}>
                    {p.brand} · ₹{p.price.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
            <button className={`mt-8 text-xs tracking-widest px-8 py-4 font-mono transition-colors rounded-lg ${
              isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
            }`}>
              ORDER THIS LOOK →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
