'use client';
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { products } from '@/data/products';
import { useMobileDetect } from '@/hooks/useMobileDetect';

export function Scene05Shop() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetect();

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
    <section ref={sectionRef} id="shop" className="bg-neutral-950 overflow-hidden">
      <div className="pt-24 px-8 md:px-16 mb-12">
        <p className="text-white/30 text-xs tracking-[0.5em] font-mono mb-4">05 / THE SHOP</p>
        <h2 className="text-white text-4xl md:text-5xl font-thin tracking-tight">READY TO WEAR</h2>
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
            <div className="aspect-[3/4] overflow-hidden mb-4 relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-light">{p.name}</p>
                <p className="text-white/50 text-xs font-mono">{p.brand}</p>
              </div>
              <div className="absolute top-3 right-3 text-white/40 text-xs font-mono group-hover:text-white transition-colors">
                {p.category.toUpperCase()}
              </div>
            </div>
            <div className="flex justify-between items-center px-1">
              <p className="text-white font-mono text-sm">₹{p.price.toLocaleString('en-IN')}</p>
              <button className="text-xs text-white/40 hover:text-white font-mono tracking-widest transition-colors">ADD +</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
