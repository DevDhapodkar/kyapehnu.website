'use client';
import { useRef, useState, useEffect } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { SplitText } from '@/components/ui/SplitText';
import { ScrollTrigger } from '@/lib/gsap';

function pad(n: number) { return String(Math.floor(n)).padStart(2, '0'); }

export function Scene02Solution() {
  const ref = useRef<HTMLElement>(null);
  const [seconds, setSeconds] = useState(3600);
  const { theme } = useApp();
  const isLight = theme === 'light';

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        setSeconds(Math.round(3600 * (1 - self.progress)));
      },
    });
    return () => trigger.kill();
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <section
      ref={ref}
      className={`min-h-screen flex flex-col items-center justify-center px-8 py-24 text-center transition-colors duration-400 ${
        isLight ? 'bg-white text-neutral-900' : 'bg-black text-white'
      }`}
    >
      <p className={`text-xs tracking-[0.5em] font-mono mb-8 ${isLight ? 'text-neutral-400' : 'text-white/30'}`}>
        02 / THE SOLUTION
      </p>
      <SplitText
        text="SO WE MADE IT FAST. REALLY FAST."
        className={`text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-none mb-4 ${
          isLight ? 'text-neutral-950' : 'text-white'
        }`}
      />
      <p className={`text-xl md:text-2xl mb-16 tracking-wide ${isLight ? 'text-neutral-600' : 'text-white/50'}`}>
        UNDER 60 MINUTES IN NAGPUR.
      </p>
      <div className={`font-mono text-7xl md:text-9xl tracking-[0.2em] tabular-nums ${
        isLight ? 'text-neutral-900' : 'text-white'
      }`}>
        {pad(mins)}:{pad(secs)}
      </div>
      <p className={`text-xs tracking-widest font-mono mt-8 ${isLight ? 'text-neutral-400' : 'text-white/30'}`}>
        SCROLL TO WATCH THE CLOCK RUN
      </p>
    </section>
  );
}
