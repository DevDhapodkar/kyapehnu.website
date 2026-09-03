'use client';
import { useRef, useEffect } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { products } from '@/data/products';
import { useMobileDetect } from '@/hooks/useMobileDetect';

export function Scene05Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetect();
  const { theme } = useApp();
  const isLight = theme === 'light';

  useEffect(() => {
    if (isMobile || !sectionRef.current || !trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 64),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: '+=3000',
        },
      });
    });
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className={`overflow-hidden transition-colors duration-400 ${
        isLight ? 'bg-white text-neutral-900' : 'bg-neutral-950 text-white'
      }`}
    >
      <div className="pt-24 px-8 md:px-16 mb-12">
        <p className={`text-xs tracking-[0.5em] font-mono mb-4 ${isLight ? 'text-neutral-500' : 'text-white/30'}`}>
          05 / THE SHOP
        </p>
        <h2 className={`text-4xl md:text-5xl font-thin tracking-tight ${isLight ? 'text-neutral-950' : 'text-white'}`}>
          READY TO WEAR
        </h2>
      </div>
      {/* Desktop: horizontal scroll track */}
      <div
        ref={trackRef}
        className={`flex gap-6 px-8 md:px-16 pb-24 ${isMobile ? 'overflow-x-auto snap-x snap-mandatory' : ''}`}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-64 md:w-72 snap-start"
          >
            <div className="aspect-[3/4] overflow-hidden mb-4 relative group rounded-2xl shadow-md border border-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-white/70 text-xs font-mono">{p.brand}</p>
              </div>
              <div className="absolute top-3 right-3 text-white/70 text-xs font-mono group-hover:text-white transition-colors bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                {p.category.toUpperCase()}
              </div>
            </div>
            <div className="flex justify-between items-center px-1 font-mono">
              <p className={`text-sm font-semibold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                ₹{p.price.toLocaleString('en-IN')}
              </p>
              <button className={`text-xs tracking-widest transition-colors font-mono cursor-pointer px-3 py-1 rounded-md border ${
                isLight
                  ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-900 hover:text-white'
                  : 'border-white/20 text-white/70 hover:bg-white hover:text-black'
              }`}>
                ADD +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
