'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { IntroState, VibeCategory } from '@/types';
import { useMobileDetect } from '@/hooks/useMobileDetect';

export type ThemeMode = 'light' | 'dark';

interface AppContextValue {
  introState: IntroState;
  setIntroState: (s: IntroState) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  activeVibe: VibeCategory;
  setActiveVibe: (v: VibeCategory) => void;
  isMobile: boolean;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue>({
  introState: 'loading',
  setIntroState: () => {},
  soundEnabled: false,
  setSoundEnabled: () => {},
  activeVibe: 'CASUAL',
  setActiveVibe: () => {},
  isMobile: false,
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [introState, setIntroState] = useState<IntroState>('loading');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeVibe, setActiveVibe] = useState<VibeCategory>('CASUAL');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const isMobile = useMobileDetect();

  useEffect(() => {
    // Apply data-theme attribute on <html> element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider
      value={{
        introState,
        setIntroState,
        soundEnabled,
        setSoundEnabled,
        activeVibe,
        setActiveVibe,
        isMobile,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
