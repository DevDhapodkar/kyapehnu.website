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
      className={`min-h-screen flex items-center px-5 sm:px-8 md:px-16 py-16 sm:py-24 transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-black text-white'
      }`}
    >
      <div className="max-w-4xl">
        <p className={`text-xs tracking-[0.5em] font-mono mb-6 sm:mb-8 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
          01 / THE PROBLEM
        </p>
        <SplitText
          text="PLANS CHANGED? OUTFIT DID TOO."
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight leading-none mb-6 sm:mb-10 ${
            isLight ? 'text-neutral-950' : 'text-white'
          }`}
          triggerRef={ref}
        />
        <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
          You have somewhere to be tonight in Nagpur. Your wardrobe doesn&apos;t agree.<br className="hidden sm:inline" /> Sound familiar?
        </p>
      </div>
    </section>
  );
}
