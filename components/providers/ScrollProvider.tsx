'use client';
import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type Lenis from '@studio-freight/lenis';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface ScrollContextValue {
  lenis: Lenis | null;
  scrollY: number;
}

const ScrollContext = createContext<ScrollContextValue>({ lenis: null, scrollY: 0 });

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMobileDetect();

  useEffect(() => {
    let instance: Lenis | null = null;
    import('@/lib/lenis').then(({ createLenis }) => {
      instance = createLenis(isMobile);
      instance.on('scroll', ({ scroll }: { scroll: number }) => setScrollY(scroll));
      setLenis(instance);
    });
    return () => { instance?.destroy(); };
  }, [isMobile]);

  return (
    <ScrollContext.Provider value={{ lenis, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScroll = () => useContext(ScrollContext);
