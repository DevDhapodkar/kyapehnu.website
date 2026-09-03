'use client';
import { useRef } from 'react';
import { SplitText } from '@/components/ui/SplitText';

export function Scene01Problem() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id="how-it-works" className="min-h-screen bg-black flex items-center px-8 md:px-16 py-24">
      <div className="max-w-4xl">
        <p className="text-white/30 text-xs tracking-[0.5em] font-mono mb-8">01 / THE PROBLEM</p>
        <SplitText
          text="PLANS CHANGED? OUTFIT DID TOO."
          className="text-white text-4xl md:text-6xl lg:text-7xl font-thin tracking-tight leading-none mb-10"
          triggerRef={ref}
        />
        <p className="text-white/50 text-lg max-w-xl leading-relaxed">
          You have somewhere to be tonight. Your wardrobe doesn&apos;t agree.<br />Sound familiar?
        </p>
      </div>
    </section>
  );
}
