'use client';
import { useRef, useState, useEffect } from 'react';
import { SplitText } from '@/components/ui/SplitText';
import { ScrollTrigger } from '@/lib/gsap';

function pad(n: number) { return String(Math.floor(n)).padStart(2, '0'); }

export function Scene02Solution() {
  const ref = useRef<HTMLElement>(null);
  const [seconds, setSeconds] = useState(3600);

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
    <section ref={ref} className="min-h-screen bg-black flex flex-col items-center justify-center px-8 py-24 text-center">
      <p className="text-white/30 text-xs tracking-[0.5em] font-mono mb-8">02 / THE SOLUTION</p>
      <SplitText
        text="SO WE MADE IT FAST. REALLY FAST."
        className="text-white text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight leading-none mb-4"
      />
      <p className="text-white/50 text-xl md:text-2xl mb-16 tracking-wide">UNDER 60 MINUTES.</p>
      <div className="font-mono text-white text-7xl md:text-9xl tracking-[0.2em] tabular-nums">
        {pad(mins)}:{pad(secs)}
      </div>
      <p className="text-white/30 text-xs tracking-widest font-mono mt-8">SCROLL TO WATCH THE CLOCK RUN</p>
    </section>
  );
}
