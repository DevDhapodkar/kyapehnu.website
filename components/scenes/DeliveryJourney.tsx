'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { useMobileDetect } from '@/hooks/useMobileDetect';
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
  const isMobile = useMobileDetect();

  const stepIndex = Math.min(4, Math.floor(progress * 5));
  const rideProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));

  useEffect(() => {
    if (isMobile || !ref.current) return;
    // Only pin on desktop — pinning on mobile causes layout jumps and empty spaces
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: '+=2500',
      pin: true,
      scrub: 1,
      onUpdate: (self) => setProgress(self.progress),
    });
    return () => trigger.kill();
  }, [isMobile]);

  // Mobile: simple stacked non-pinned layout
  if (isMobile) {
    return (
      <section
        className={`py-16 px-5 transition-colors duration-400 ${
          isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-black text-white'
        }`}
      >
        <p className={`text-xs tracking-[0.5em] font-mono mb-8 text-center ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
          THE JOURNEY
        </p>
        <div className="space-y-4 max-w-sm mx-auto">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl ${
                isLight ? 'bg-white/80 border border-purple-200/30' : 'bg-white/5 border border-purple-400/15'
              }`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-2xl flex-shrink-0">{step.icon}</span>
              <div>
                <p className={`text-xs font-mono tracking-wider font-semibold ${isLight ? 'text-neutral-900' : 'text-white'}`}>{step.label}</p>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-neutral-500' : 'text-white/50'}`}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="w-full max-w-sm mx-auto mt-8 px-2">
          <DeliveryMap progress={1} />
        </div>
      </section>
    );
  }

  // Desktop: pinned scroll-driven journey
  return (
    <section
      ref={ref}
      className={`h-screen flex flex-col items-center justify-center px-8 transition-colors duration-400 ${
        isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-black text-white'
      }`}
    >
      <p className={`text-xs tracking-[0.5em] font-mono mb-12 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
        THE JOURNEY
      </p>
      <div className="flex gap-8 mb-16">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 transition-opacity duration-500 min-w-[60px] text-center"
            style={{ opacity: i <= stepIndex ? 1 : 0.25 }}
          >
            <span className="text-2xl">{step.icon}</span>
            <p className={`text-xs tracking-wider font-mono ${isLight ? 'text-neutral-900' : 'text-white'}`}>{step.label}</p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-lg mb-8 px-2">
        <DeliveryMap progress={rideProgress} />
      </div>
      <p className={`text-sm text-center font-mono max-w-md ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
        {STEPS[stepIndex].desc}
      </p>
    </section>
  );
}
