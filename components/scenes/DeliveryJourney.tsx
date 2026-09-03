'use client';
import { useRef, useState, useEffect } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { ScrollTrigger } from '@/lib/gsap';
import { DeliveryMap } from '@/components/ui/DeliveryMap';

const STEPS = [
  { icon: '🛍', label: 'ORDER PLACED', desc: 'Your look is confirmed.' },
  { icon: '📦', label: 'PACKED', desc: 'Styled and sealed in minutes.' },
  { icon: '🏍', label: 'ON THE RIDE', desc: 'Your outfit is on its way.' },
  { icon: '📍', label: 'NEARBY', desc: 'Almost there.' },
  { icon: '✓', label: 'DELIVERED', desc: 'Your look has arrived. Enjoy.' },
];

export function DeliveryJourney() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const { theme } = useApp();
  const isLight = theme === 'light';

  const stepIndex = Math.min(4, Math.floor(progress * 5));
  const rideProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: '+=2500',
      pin: true,
      scrub: 1,
      onUpdate: (self) => setProgress(self.progress),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={ref}
      className={`h-screen flex flex-col items-center justify-center px-8 transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-black text-white'
      }`}
    >
      <p className={`text-xs tracking-[0.5em] font-mono mb-12 ${isLight ? 'text-neutral-500' : 'text-white/30'}`}>
        THE JOURNEY
      </p>
      <div className="flex gap-4 md:gap-8 mb-16">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 transition-opacity duration-500"
            style={{ opacity: i <= stepIndex ? 1 : 0.2 }}
          >
            <span className="text-2xl">{step.icon}</span>
            <p className={`text-xs tracking-widest font-mono hidden md:block ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-lg mb-8">
        <DeliveryMap progress={rideProgress} />
      </div>
      <p className={`text-sm text-center font-mono ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
        {STEPS[stepIndex].desc}
      </p>
    </section>
  );
}
