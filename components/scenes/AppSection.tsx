'use client';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { appScreens } from '@/data/appScreens';
import { siteConfig } from '@/config/site.config';

export function AppSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { theme } = useApp();
  const isLight = theme === 'light';

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => setActive((a) => (a + 1) % appScreens.length), 2500);
    return () => clearInterval(interval);
  }, [inView]);

  const { IOS_APP_DOWNLOAD_LINK, ANDROID_APP_DOWNLOAD_LINK } = siteConfig;

  return (
    <section className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 sm:gap-16 px-5 sm:px-8 md:px-16 py-16 sm:py-24 transition-colors duration-400 ${
      isLight ? 'bg-[#f8f9fa] text-neutral-900' : 'bg-neutral-950 text-white'
    }`}>
      <div className="flex-1 max-w-md text-center md:text-left">
        <p className={`text-xs tracking-[0.5em] font-mono mb-6 sm:mb-8 ${isLight ? 'text-purple-700 font-semibold' : 'text-purple-300'}`}>
          THE APP
        </p>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-thin tracking-tight mb-4 sm:mb-6 ${isLight ? 'text-neutral-950' : 'text-white'}`}>
          FASHION IN<br />YOUR POCKET.
        </h2>
        <p className={`text-xs sm:text-base mb-8 sm:mb-12 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-white/60'}`}>
          Browse, style, and order from anywhere in Nagpur. Your 60-minute delivery clock starts the moment you tap.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
          {IOS_APP_DOWNLOAD_LINK && (
            <a href={IOS_APP_DOWNLOAD_LINK} className={`text-xs tracking-widest px-6 py-3.5 font-mono border transition-colors min-h-[44px] flex items-center justify-center ${
              isLight ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'
            }`}>
              APP STORE
            </a>
          )}
          {ANDROID_APP_DOWNLOAD_LINK && (
            <a href={ANDROID_APP_DOWNLOAD_LINK} className={`text-xs tracking-widest px-6 py-3.5 font-mono border transition-colors min-h-[44px] flex items-center justify-center ${
              isLight ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'
            }`}>
              GOOGLE PLAY
            </a>
          )}
          {!IOS_APP_DOWNLOAD_LINK && !ANDROID_APP_DOWNLOAD_LINK && (
            <button disabled className={`text-xs tracking-widest px-6 py-3.5 font-mono border rounded-lg cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2 ${
              isLight
                ? 'border-purple-300 text-purple-800 bg-purple-50/70'
                : 'border-purple-400/30 text-purple-300 bg-purple-500/10'
            }`}>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>APP COMING SOON — IOS & ANDROID</span>
            </button>
          )}
        </div>
      </div>

      {/* Phone mockup */}
      <div ref={ref} className="flex-shrink-0">
        <div
          className={`w-48 sm:w-56 md:w-64 h-[420px] sm:h-[480px] md:h-[540px] rounded-3xl border overflow-hidden relative shadow-2xl ${
            isLight ? 'border-neutral-300 bg-white' : 'border-white/20 bg-black'
          }`}
          style={{ transform: 'perspective(1000px) rotateY(-6deg) rotateX(2deg)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
              style={{ background: appScreens[active].bgColor }}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white/40 text-xs font-mono mb-4 tracking-widest">KYA PEHNU?</p>
              <p className="text-white text-base sm:text-lg font-thin text-center mb-3">{appScreens[active].title}</p>
              <p className="text-white/60 text-xs text-center">{appScreens[active].description}</p>
            </motion.div>
          </AnimatePresence>
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-1.5 bg-black/60 rounded-full z-10" />
        </div>
      </div>
    </section>
  );
}
