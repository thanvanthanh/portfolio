'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export type ThemeMode = 'dark' | 'light';
export type LangMode = 'en' | 'vi';

type PortfolioContextValue = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  lang: LangMode;
  setLang: (l: LangMode) => void;
  toggleLang: () => void;
  cmdOpen: boolean;
  setCmdOpen: (v: boolean) => void;
  heroExploded: boolean;
  setHeroExploded: (v: boolean) => void;
  toggleHeroExploded: () => void;
  pendingSimScenario: 'pg' | 'figma' | 'block' | null;
  triggerSimScenario: (scenario: 'pg' | 'figma' | 'block') => void;
  clearPendingSimScenario: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [lang, setLangState] = useState<LangMode>('en');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [heroExploded, setHeroExploded] = useState(false);
  const [pendingSimScenario, setPendingSimScenario] = useState<'pg' | 'figma' | 'block' | null>(null);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('tvt-theme') as ThemeMode | null;
      const savedLang = localStorage.getItem('tvt-lang') as LangMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        document.documentElement.dataset.theme = savedTheme;
      } else {
        document.documentElement.dataset.theme = 'dark';
      }
      if (savedLang === 'vi' || savedLang === 'en') {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('tvt-theme', next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('tvt-theme', next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const setLang = useCallback((next: LangMode) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem('tvt-lang', next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: LangMode = prev === 'en' ? 'vi' : 'en';
      document.documentElement.lang = next;
      try {
        localStorage.setItem('tvt-lang', next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const toggleHeroExploded = useCallback(() => {
    setHeroExploded((v) => !v);
  }, []);

  const triggerSimScenario = useCallback((scenario: 'pg' | 'figma' | 'block') => {
    setPendingSimScenario(scenario);
    const el = document.getElementById('ai-systems');
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -40, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const clearPendingSimScenario = useCallback(() => {
    setPendingSimScenario(null);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for Spatial Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        cmdOpen,
        setCmdOpen,
        heroExploded,
        setHeroExploded,
        toggleHeroExploded,
        pendingSimScenario,
        triggerSimScenario,
        clearPendingSimScenario,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used inside PortfolioProvider');
  }
  return ctx;
}
