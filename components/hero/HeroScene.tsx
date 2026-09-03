'use client';
import { ScrollytellingHero } from './ScrollytellingHero';

interface HeroSceneProps {
  modelPath?: string | null;
}

export function HeroScene({ modelPath }: HeroSceneProps) {
  return (
    <section id="hero" className="relative w-full">
      <ScrollytellingHero />
    </section>
  );
}
