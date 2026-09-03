'use client';
import { useRef } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { SplitText } from '@/components/ui/SplitText';

export function Scene01Problem() {
  const ref = useRef<HTMLElement>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';

  return (
    <section
      ref={ref}
      id="how-it-works"
      className={`min-h-screen flex items-center px-8 md:px-16 py-24 transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-black text-white'
      }`}
    >
      <div className="max-w-4xl">
        <p className={`text-xs tracking-[0.5em] font-mono mb-8 ${isLight ? 'text-neutral-400' : 'text-white/30'}`}>
          01 / THE PROBLEM
        </p>
        <SplitText
          text="PLANS CHANGED? OUTFIT DID TOO."
          className={`text-4xl md:text-6xl lg:text-7xl font-thin tracking-tight leading-none mb-10 ${
            isLight ? 'text-neutral-950' : 'text-white'
          }`}
          triggerRef={ref}
        />
        <p className={`text-lg max-w-xl leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/50'}`}>
          You have somewhere to be tonight in Nagpur. Your wardrobe doesn&apos;t agree.<br />Sound familiar?
        </p>
      </div>
    </section>
  );
}
