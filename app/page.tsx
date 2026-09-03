'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/providers/AppProvider';
import { LoadingSequence } from '@/components/intro/LoadingSequence';
import { CinematicIntro } from '@/components/intro/CinematicIntro';
import { HeroScene } from '@/components/hero/HeroScene';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Scene01Problem } from '@/components/scenes/Scene01Problem';
import { Scene02Solution } from '@/components/scenes/Scene02Solution';
import { Scene03Vibe } from '@/components/scenes/Scene03Vibe';
import { Scene05Shop } from '@/components/scenes/Scene05Shop';
import { DeliveryJourney } from '@/components/scenes/DeliveryJourney';
import { AppSection } from '@/components/scenes/AppSection';
import { SocialProof } from '@/components/scenes/SocialProof';
import { FinalScene } from '@/components/scenes/FinalScene';

// Detect any GLB in /public/models at runtime (client-side check)
async function detectModel(): Promise<string | null> {
  try {
    const res = await fetch('/api/model-path');
    if (!res.ok) return null;
    const { path } = await res.json();
    return path ?? null;
  } catch {
    return null;
  }
}

export default function HomePage() {
  const { introState, setIntroState } = useApp();
  const [modelPath, setModelPath] = useState<string | null>(null);

  useEffect(() => {
    detectModel().then(setModelPath);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {introState === 'loading' && (
          <LoadingSequence key="loading" onComplete={() => setIntroState('hero')} />
        )}
        {introState === 'intro' && (
          <CinematicIntro key="intro" onEnter={() => setIntroState('hero')} />
        )}
      </AnimatePresence>

      {introState === 'hero' && (
        <>
          <Nav />
          <main>
            <HeroScene modelPath={modelPath} />
            <Scene01Problem />
            <Scene02Solution />
            <Scene03Vibe />
            <Scene05Shop />
            <DeliveryJourney />
            <AppSection />
            <SocialProof />
            <FinalScene />
          </main>
          <Footer />
        </>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Kya Pehnu?',
            url: 'https://kyapehnu.com',
            logo: 'https://kyapehnu.com/logo.png',
          }),
        }}
      />
    </>
  );
}
