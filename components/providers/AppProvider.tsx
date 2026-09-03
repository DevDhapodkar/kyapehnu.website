'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IntroState, VibeCategory } from '@/types';
import { useMobileDetect } from '@/hooks/useMobileDetect';

interface AppContextValue {
  introState: IntroState;
  setIntroState: (s: IntroState) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  activeVibe: VibeCategory;
  setActiveVibe: (v: VibeCategory) => void;
  isMobile: boolean;
}

const AppContext = createContext<AppContextValue>({
  introState: 'loading',
  setIntroState: () => {},
  soundEnabled: false,
  setSoundEnabled: () => {},
  activeVibe: 'CASUAL',
  setActiveVibe: () => {},
  isMobile: false,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [introState, setIntroState] = useState<IntroState>('loading');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeVibe, setActiveVibe] = useState<VibeCategory>('CASUAL');
  const isMobile = useMobileDetect();

  return (
    <AppContext.Provider value={{ introState, setIntroState, soundEnabled, setSoundEnabled, activeVibe, setActiveVibe, isMobile }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
