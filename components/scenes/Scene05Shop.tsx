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
      <div className="pt-16 sm:pt-24 px-5 sm:px-8 md:px-16 mb-8 sm:mb-12">
        <p className={`text-xs tracking-[0.5em] font-mono mb-3 sm:mb-4 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
          05 / THE SHOP
        </p>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight ${isLight ? 'text-neutral-950' : 'text-white'}`}>
          READY TO WEAR
        </h2>
      </div>
      {/* Desktop: horizontal scroll track / Mobile: snap-x horizontal swipe */}
      <div
        ref={trackRef}
        className={`flex gap-4 sm:gap-6 px-5 sm:px-8 md:px-16 pb-16 sm:pb-24 ${isMobile ? 'overflow-x-auto snap-x snap-mandatory scrollbar-none' : ''}`}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-56 sm:w-64 md:w-72 snap-start"
          >
            <div className="aspect-[3/4] overflow-hidden mb-3.5 relative group rounded-2xl shadow-md border border-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                <p className="text-xs sm:text-sm font-medium">{p.name}</p>
                <p className="text-white/70 text-[10px] sm:text-xs font-mono">{p.brand}</p>
              </div>
              <div className="absolute top-2.5 right-2.5 text-white/80 text-[10px] font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                {p.category.toUpperCase()}
              </div>
            </div>
            <div className="flex justify-between items-center px-1 font-mono">
              <p className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                ₹{p.price.toLocaleString('en-IN')}
              </p>
              <button className={`text-xs tracking-widest transition-colors font-mono cursor-pointer px-3.5 py-2 rounded-md border min-h-[44px] flex items-center justify-center ${
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
