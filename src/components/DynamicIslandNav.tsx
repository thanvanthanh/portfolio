'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X, ChevronRight } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function DynamicIslandNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      setScrolled(isScrolled);
      if (isScrolled && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`pointer-events-auto relative flex items-center justify-between transition-colors duration-300 ${scrolled
            ? 'rounded-full bg-[#0a0a0f]/90 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(41,151,255,0.15)] backdrop-blur-2xl px-3 py-2'
            : 'w-full max-w-5xl rounded-full bg-[#121217]/75 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl px-5 py-3'
            }`}
        >
          {/* Left Brand / Status Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 text-white font-semibold text-[14px] tracking-tight cursor-pointer"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-white/25 bg-white/10 shadow-lg shadow-black/40 transition-transform group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Thanh .dev"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden sm:inline-block font-medium">
                Thanh <span className="text-accent font-semibold">.dev</span>
              </span>
            </a>

            {/* Dynamic Status Pill */}
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for hire</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className={`${scrolled ? 'hidden md:flex' : 'hidden md:flex'} items-center gap-1 mx-3`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setActiveTab(item.href)}
                onMouseLeave={() => setActiveTab('')}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {activeTab === item.href && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="relative group inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-accent px-4 py-1.5 text-[12px] font-semibold text-white shadow-[0_0_20px_rgba(41,151,255,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_0_28px_rgba(41,151,255,0.6)] active:scale-95"
            >
              <Send className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              <span>Connect</span>
            </a>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 active:scale-90 transition"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Dynamic Island Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed inset-x-4 top-20 z-50 overflow-hidden rounded-3xl border border-white/15 bg-[#0f0f14]/95 p-6 shadow-2xl backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[12px] text-white/50 uppercase tracking-wider font-semibold">
                <span>Navigation</span>
                <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Hanoi, Vietnam
                </span>
              </div>

              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[16px] font-medium text-white/90 hover:bg-white/10 active:bg-white/15 transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-white/40" />
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-[14px] font-semibold text-white shadow-[0_0_24px_rgba(41,151,255,0.4)]"
                >
                  <Send className="h-4 w-4" />
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
