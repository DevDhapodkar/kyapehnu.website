'use client';
import { useEffect, useRef } from 'react';
import { useApp } from '@/components/providers/AppProvider';

export function SoundController() {
  const { soundEnabled, setSoundEnabled } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const handleVisibility = () => {
      if (document.hidden) audioRef.current?.pause();
      else if (soundEnabled) audioRef.current?.play();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (soundEnabled) audioRef.current?.play().catch(() => {});
    else audioRef.current?.pause();
  }, [soundEnabled]);

  return (
    <>
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-4 right-4 z-50 text-xs tracking-widest text-white/60 hover:text-white transition-colors font-mono"
        aria-label={soundEnabled ? 'Disable ambient sound' : 'Enable ambient sound'}
      >
        {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
      </button>
      <div aria-live="polite" className="sr-only">
        {soundEnabled ? 'Sound enabled' : 'Sound disabled'}
      </div>
    </>
  );
}
