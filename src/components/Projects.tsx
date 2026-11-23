'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  X,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { projects, type Project, type ProjectCategory } from '~/data/portfolio';
import { usePortfolio } from '~/components/PortfolioProvider';
import Tilt3DCard from '~/components/three/Tilt3DCard';

type FilterTab = 'cv' | ProjectCategory;

export default function Projects() {
  const { lang } = usePortfolio();
  const [filter, setFilter] = useState<FilterTab>('cv');
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visibleProjects =
    filter === 'cv'
      ? projects.filter((p) => p.category !== 'archive')
      : projects.filter((p) => p.category === filter);

  const tabs: { key: FilterTab; labelEn: string; labelVi: string }[] = [
    { key: 'cv', labelEn: 'Featured CV (7)', labelVi: 'Nổi bật CV (7)' },
    { key: 'banking', labelEn: 'Banking & Fintech', labelVi: 'Ngân hàng & Fintech' },
    { key: 'ai', labelEn: 'AI & Infra', labelVi: 'AI & Hạ tầng' },
    { key: 'consumer', labelEn: 'Super-App & Consumer', labelVi: 'Super-App & Tiêu dùng' },
    { key: 'archive', labelEn: 'More Archive (3)', labelVi: 'Dự án khác (3)' },
  ];

  return (
    <section id="work" className="relative z-10 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">Selected Production Portfolio</div>
            <h2 className="display-1 mt-3 font-display" style={{ color: 'var(--ink)' }}>
              {lang === 'vi' ? (
                <>
                  Sản phẩm triệu người dùng.{' '}
                  <span className="grad-text">Chiều sâu 3D.</span>
                </>
              ) : (
                <>
                  Shipped to Millions.{' '}
                  <span className="grad-text">Engineered for Scale.</span>
                </>
              )}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {tabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
                  style={
                    active
                      ? {
                          background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                          color: '#ffffff',
                          border: '1px solid transparent',
                          boxShadow: '0 8px 22px rgba(37, 99, 235, 0.32)',
                        }
                      : {
                          background: 'var(--surface)',
                          color: 'var(--ink-2)',
                          border: '1px solid var(--border)',
                        }
                  }
                >
                  {lang === 'vi' ? tab.labelVi : tab.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Spatial Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {visibleProjects.map((project, idx) => {
            const isHeroSpan =
              filter === 'cv'
                ? project.featured || idx >= 5
                  ? 'lg:col-span-3'
                  : 'lg:col-span-2'
                : 'lg:col-span-3';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.24) }}
                className={isHeroSpan}
              >
                <Tilt3DCard
                  maxTilt={9}
                  onClick={() => setSelected(project)}
                  role="button"
                  tabIndex={0}
                  ariaLabel={`Inspect ${project.name} case study`}
                  className="group flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[30px] p-6"
                >
                  {/* Ambient Brand Glow */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-45"
                    style={{ background: project.accent }}
                  />

                  <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Visual Media Header (Floats in 3D Z-Space on Card Hover!) */}
                    {project.image ? (
                      <div
                        style={{ transform: 'translateZ(26px)' }}
                        className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl border shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      >
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-white">
                          <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 backdrop-blur">
                            {project.metrics}
                          </span>
                          <span className="text-white/80">{project.year}</span>
                        </div>
                      </div>
                    ) : project.id === 'techcombank-mobile' ? (
                      <div
                        className="relative mb-5 flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-rose-500/35 p-4 text-white shadow-xl"
                        style={{
                          transform: 'translateZ(26px)',
                          background:
                            'linear-gradient(135deg, #2b0a12 0%, #101627 55%, #09131e 100%)',
                        }}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] text-rose-300">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            PROJECT HYPER-P · RETAIL BANKING
                          </span>
                          <span>{project.year}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                            <div className="text-slate-400">Calculator</div>
                            <div className="mt-0.5 font-bold text-emerald-400">Benefit Engine</div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                            <div className="text-slate-400">Config</div>
                            <div className="mt-0.5 font-bold text-sky-300">Adobe AEM</div>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                            <div className="text-slate-400">AI Workflow</div>
                            <div className="mt-0.5 font-bold text-amber-300">Kiro + MCP</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="relative mb-5 flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-emerald-400/35 p-4 text-white shadow-xl"
                        style={{
                          transform: 'translateZ(26px)',
                          background:
                            'linear-gradient(135deg, #06211c 0%, #0b1424 58%, #071320 100%)',
                        }}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] text-emerald-300">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                            BIFROST GO · FASTMCP PYTHON
                          </span>
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                            KEYCLOAK
                          </span>
                        </div>
                        <div className="rounded-xl border border-emerald-400/25 bg-black/55 p-3 font-mono text-[11px] leading-relaxed text-emerald-200">
                          <div>$ gateway.route(&quot;multi-llm&quot;) → 200 OK</div>
                          <div className="text-sky-300">
                            $ fastmcp.inspect_pg_schema() → READ_ONLY ✓
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                      <span
                        className="rounded-full px-2.5 py-0.5 font-semibold"
                        style={{
                          background: 'var(--surface-solid)',
                          border: '1px solid var(--border)',
                          color: 'var(--ink-2)',
                        }}
                      >
                        {project.role}
                      </span>
                      <span style={{ color: 'var(--ink-3)' }}>{project.company}</span>
                    </div>

                    <h3
                      className="mt-3 font-display text-xl font-extrabold tracking-tight sm:text-2xl"
                      style={{ color: 'var(--ink)' }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="mt-1 text-sm font-semibold"
                      style={{ color: project.accent }}
                    >
                      {lang === 'vi' ? project.taglineVi : project.tagline}
                    </p>
                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: 'var(--ink-2)' }}
                    >
                      {lang === 'vi' ? project.descriptionVi : project.description}
                    </p>
                  </div>

                  {/* Footer Pills & Inspect Trigger */}
                  <div
                    className="relative z-10 mt-5 flex items-center justify-between gap-3 border-t pt-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md px-2 py-0.5 font-mono text-[11px]"
                          style={{
                            background: 'var(--surface-solid)',
                            border: '1px solid var(--border)',
                            color: 'var(--ink-2)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span
                          className="rounded-md px-2 py-0.5 font-mono text-[11px]"
                          style={{ color: 'var(--ink-3)' }}
                        >
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <span
                      className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-semibold transition-transform group-hover:translate-x-0.5"
                      style={{ color: 'var(--accent)' }}
                    >
                      <span>{lang === 'vi' ? 'Chi tiết' : 'Inspect'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} Case Study`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="spatial-glass max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl p-6 sm:p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs font-semibold" style={{ color: selected.accent }}>
                    {selected.company} · {selected.year}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-extrabold" style={{ color: 'var(--ink)' }}>
                    {selected.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: 'var(--ink-2)' }}>
                    {selected.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close modal"
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full"
                  style={{ background: 'var(--surface-2)', color: 'var(--ink)' }}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {lang === 'vi' ? selected.descriptionVi : selected.description}
              </p>

              <div className="mt-5 space-y-2.5">
                {selected.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-2xl p-3 text-sm"
                    style={{
                      background: 'var(--surface-solid)',
                      border: '1px solid var(--border)',
                      color: 'var(--ink)',
                    }}
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: selected.accent }}
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 font-mono text-xs"
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.28)',
                      color: 'var(--accent)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {selected.link && (
                <div className="mt-6 flex justify-end">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-110"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #0ea5e9)' }}
                  >
                    <span>Open on App Store</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
