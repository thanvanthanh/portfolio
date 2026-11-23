'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Search,
} from 'lucide-react';
import { usePortfolio } from '~/components/PortfolioProvider';
import MagneticButton from '~/components/three/MagneticButton';

export default function DynamicIslandNav() {
  const { theme, toggleTheme, lang, toggleLang, setCmdOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'ai-systems', label: lang === 'vi' ? 'Mô phỏng AI' : 'AI Lab', href: '#ai-systems' },
    { id: 'work', label: lang === 'vi' ? 'Dự án' : 'Work', href: '#work' },
    { id: 'skills', label: lang === 'vi' ? 'Kỹ năng 3D' : 'Skills', href: '#skills' },
    { id: 'experience', label: lang === 'vi' ? 'Kinh nghiệm' : 'Experience', href: '#experience' },
    { id: 'contact', label: lang === 'vi' ? 'Liên hệ' : 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > 60 && isOpen) setIsOpen(false);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollPct(Math.min(100, Math.max(0, (y / max) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  useEffect(() => {
    const ids = ['ai-systems', 'work', 'skills', 'about', 'experience', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:px-4">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          className={`spatial-glass pointer-events-auto relative overflow-hidden rounded-full transition-all duration-300 ${
            scrolled
              ? 'w-full max-w-content md:w-auto md:max-w-[calc(100vw-2rem)]'
              : 'w-full max-w-content'
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5 md:gap-5">
            {/* Left Brand + Current Role Badge */}
            <div className="flex shrink-0 items-center gap-2.5">
              <a
                href="#top"
                onClick={scrollToTop}
                className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-sm font-bold tracking-tight"
                style={{ color: 'var(--ink)' }}
              >
                <div
                  className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-md transition-transform group-hover:scale-105"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <img
                    src="/logo.png"
                    alt="Than Van Thanh"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="hidden whitespace-nowrap sm:inline-block">
                  Thanh<span style={{ color: 'var(--accent)' }}>.dev</span>
                </span>
              </a>

              {!scrolled && (
                <div
                  className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] font-medium xl:inline-flex"
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: 'var(--emerald)',
                  }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="whitespace-nowrap">iOS @ Techcombank</span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav aria-label="Primary Navigation" className="hidden shrink-0 items-center gap-0.5 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors"
                    style={{ color: isActive ? 'var(--ink)' : 'var(--ink-2)' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-spatial-nav"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Interactive Controls */}
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCmdOpen(true)}
                aria-label="Open Command Palette"
                className="hidden h-8 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 font-mono text-[11px] font-medium transition hover:opacity-90 sm:inline-flex"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink-2)',
                }}
              >
                <Search className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>⌘K</span>
              </button>

              <button
                type="button"
                onClick={toggleLang}
                aria-label="Toggle Language"
                className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-2.5 font-mono text-[11px] font-semibold transition hover:opacity-90"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink)',
                }}
              >
                {lang.toUpperCase()}
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:opacity-90"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink)',
                }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                ) : (
                  <Moon className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                )}
              </button>

              <MagneticButton
                href="#contact"
                className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white sm:inline-flex"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #0284c7)',
                  boxShadow: '0 8px 22px rgba(37, 99, 235, 0.42)',
                }}
              >
                <Send className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{lang === 'vi' ? 'Liên hệ' : 'Connect'}</span>
              </MagneticButton>

              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle Mobile Menu"
                aria-expanded={isOpen}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full md:hidden"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink)',
                }}
              >
                {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Scroll Progress Beam */}
          <div className="h-[2px] w-full bg-transparent">
            <div
              className="h-full transition-[width] duration-75 ease-linear"
              style={{
                width: `${scrollPct}%`,
                background: 'linear-gradient(90deg, #2563eb, #38bdf8, #10b981)',
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.85)',
              }}
            />
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="spatial-glass fixed inset-x-4 top-20 z-50 overflow-hidden rounded-3xl p-5 shadow-2xl md:hidden"
          >
            <div
              className="flex items-center justify-between border-b pb-3 font-mono text-[11px] uppercase tracking-wider"
              style={{ borderColor: 'var(--border)', color: 'var(--ink-3)' }}
            >
              <span>Navigation</span>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--emerald)' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Hanoi, Vietnam
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-1.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium transition hover:bg-sky-500/10"
                  style={{ color: 'var(--ink)' }}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4" style={{ color: 'var(--ink-3)' }} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-4 flex gap-2 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setCmdOpen(true);
                }}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-2.5 font-mono text-xs font-semibold"
                style={{
                  background: 'var(--surface-solid)',
                  border: '1px solid var(--border)',
                  color: 'var(--ink)',
                }}
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Command ⌘K</span>
              </button>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-2.5 text-xs font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #0284c7)' }}
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lang === 'vi' ? 'Liên hệ' : 'Get in touch'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
