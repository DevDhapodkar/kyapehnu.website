import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';

export function createLenis(isMobile = false) {
  const lenis = new Lenis({
    lerp: isMobile ? 0 : 0.1,
    smoothWheel: !isMobile,
  });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
