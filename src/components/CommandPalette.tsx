'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Layers,
  Terminal,
  ShieldAlert,
  Sun,
  Moon,
  Languages,
  Copy,
  FileText,
  X,
  Command,
} from 'lucide-react';
import { usePortfolio } from '~/components/PortfolioProvider';
import { profile } from '~/data/portfolio';

export default function CommandPalette() {
  const {
    cmdOpen,
    setCmdOpen,
    theme,
    toggleTheme,
    lang,
    toggleLang,
    heroExploded,
    toggleHeroExploded,
    triggerSimScenario,
  } = usePortfolio();
  const [copiedNotice, setCopiedNotice] = useState(false);

  useEffect(() => {
    if (!cmdOpen) setCopiedNotice(false);
  }, [cmdOpen]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -40, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const actions = [
    {
      id: 'explode',
      label:
        lang === 'vi'
          ? heroExploded
            ? 'Gộp lại iPhone 3D'
            : 'Tách lớp iPhone 3D (Explode Layers)'
          : heroExploded
          ? 'Assemble 3D iPhone Layers'
          : 'Explode 3D iPhone Hardware Layers',
      tag: '3D FX',
      tagColor: 'var(--emerald)',
      icon: Layers,
      run: () => {
        setCmdOpen(false);
        scrollTo('#top');
        toggleHeroExploded();
      },
    },
    {
      id: 'sim-pg',
      label:
        lang === 'vi'
          ? 'Chạy mô phỏng PostgreSQL MCP (DBInc)'
          : 'Run Live PostgreSQL MCP Schema Flow (DBInc)',
      tag: 'DEMO',
      tagColor: 'var(--accent)',
      icon: Terminal,
      run: () => {
        setCmdOpen(false);
        triggerSimScenario('pg');
      },
    },
    {
      id: 'sim-block',
      label:
        lang === 'vi'
          ? 'Thử chặn lệnh DROP TABLE (Read-Only Guard)'
          : 'Trigger Read-Only Security Guard (DROP TABLE)',
      tag: 'SEC',
      tagColor: 'var(--rose)',
      icon: ShieldAlert,
      run: () => {
        setCmdOpen(false);
        triggerSimScenario('block');
      },
    },
    {
      id: 'theme',
      label:
        theme === 'dark'
          ? lang === 'vi'
            ? 'Chuyển sang Studio Light 3D'
            : 'Switch to Studio Light 3D'
          : lang === 'vi'
          ? 'Chuyển sang Obsidian Dark 3D'
          : 'Switch to Obsidian Dark 3D',
      tag: 'THEME',
      tagColor: 'var(--violet)',
      icon: theme === 'dark' ? Sun : Moon,
      run: () => {
        toggleTheme();
        setCmdOpen(false);
      },
    },
    {
      id: 'lang',
      label:
        lang === 'en'
          ? 'Chuyển ngôn ngữ sang Tiếng Việt (VI)'
          : 'Switch language to English (EN)',
      tag: lang === 'en' ? 'VI' : 'EN',
      tagColor: 'var(--accent)',
      icon: Languages,
      run: () => {
        toggleLang();
        setCmdOpen(false);
      },
    },
    {
      id: 'copy-email',
      label: copiedNotice
        ? lang === 'vi'
          ? 'Đã sao chép Email!'
          : 'Copied Email to clipboard!'
        : `${lang === 'vi' ? 'Sao chép Email' : 'Copy Email'} (${profile.email})`,
      tag: 'COPY',
      tagColor: 'var(--emerald)',
      icon: Copy,
      run: () => {
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.35 },
          colors: ['#38bdf8', '#10b981', '#a78bfa', '#ffffff'],
        });
        setCopiedNotice(true);
        setTimeout(() => setCmdOpen(false), 650);
      },
    },
    {
      id: 'cv',
      label: lang === 'vi' ? 'Mở CV đầy đủ' : 'Open Full CV Document',
      tag: 'CV',
      tagColor: 'var(--ink-2)',
      icon: FileText,
      run: () => {
        window.open(profile.cvUrl, '_blank', 'noopener,noreferrer');
        setCmdOpen(false);
      },
    },
  ];

  return (
    <AnimatePresence>
      {cmdOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setCmdOpen(false)}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/65 px-4 pt-20 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Spatial Command Palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="spatial-glass w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
          >
            <div
              className="flex items-center justify-between border-b px-5 py-3.5"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2 font-mono text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>
                <Command className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span>SPATIAL COMMAND PALETTE</span>
              </div>
              <button
                type="button"
                onClick={() => setCmdOpen(false)}
                aria-label="Close Command Palette"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition hover:opacity-80"
                style={{ background: 'var(--surface-2)', color: 'var(--ink-2)' }}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y p-2" style={{ borderColor: 'var(--border)' }}>
              {actions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.run}
                    className="group flex w-full cursor-pointer items-center justify-between rounded-2xl px-3.5 py-3 text-left transition hover:bg-sky-500/10"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--ink)' }}>
                      <Icon className="h-4 w-4 shrink-0" style={{ color: item.tagColor }} aria-hidden="true" />
                      <span>{item.label}</span>
                    </span>
                    <span
                      className="rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold"
                      style={{
                        color: item.tagColor,
                        background: 'var(--surface-solid)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
