'use client';

import { motion } from 'framer-motion';
import { Cpu, Layers, Play, ArrowUpRight } from 'lucide-react';
import { profile, stats, techMarquee } from '~/data/portfolio';
import { usePortfolio } from '~/components/PortfolioProvider';
import InteractiveDevice3D from '~/components/three/InteractiveDevice3D';
import MagneticButton from '~/components/three/MagneticButton';

export default function Hero() {
  const { lang, heroExploded, toggleHeroExploded } = usePortfolio();

  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden pt-24 pb-8 sm:pt-28">
      <div className="container-x my-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: Positioning & Interactive CTAs */}
        <div className="space-y-6 text-center lg:col-span-6 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold"
            style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.32)',
              color: 'var(--accent)',
            }}
          >
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            <span>MOBILE ENGINEER · AI-NATIVE SYSTEMS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-hero font-display"
            style={{ color: 'var(--ink)' }}
          >
            <span>{profile.name}.</span>
            <span className="grad-text mt-1.5 block">
              {lang === 'vi'
                ? 'Tinh hoa Mobile 3D. Kiến trúc AI-Native.'
                : 'Spatial Mobile Craft. AI-Native Scale.'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lede mx-auto max-w-xl lg:mx-0"
          >
            {lang === 'vi' ? (
              <>
                Hơn 5 năm kiến tạo ứng dụng{' '}
                <strong style={{ color: 'var(--ink)' }}>iOS &amp; Flutter</strong> trong
                lĩnh vực ngân hàng, fintech và super-app. Tiên phong quy trình{' '}
                <strong style={{ color: 'var(--ink)' }}>AI-native</strong> với Claude
                Code, Kiro &amp; MCP — trực tiếp xây dựng Go LLM Gateway và PostgreSQL MCP
                Server chỉ-đọc.
              </>
            ) : (
              <>
                5+ years architecting production{' '}
                <strong style={{ color: 'var(--ink)' }}>iOS &amp; Flutter</strong> apps
                across banking, fintech, and super-apps. Driving{' '}
                <strong style={{ color: 'var(--ink)' }}>AI-native workflows</strong> with
                Claude Code, Kiro &amp; MCP — backed by building a unified Go LLM Gateway
                and read-only PostgreSQL MCP server.
              </>
            )}
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start"
          >
            <MagneticButton
              href="#ai-systems"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                boxShadow: '0 14px 36px rgba(37, 99, 235, 0.42)',
              }}
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{lang === 'vi' ? 'Chạy thử Lab MCP 3D' : 'Try 3D MCP Lab'}</span>
            </MagneticButton>

            <MagneticButton
              onClick={toggleHeroExploded}
              className="spatial-glass inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              style={{ color: 'var(--ink)' }}
            >
              <Layers className="h-4 w-4" style={{ color: 'var(--emerald)' }} aria-hidden="true" />
              <span>
                {heroExploded
                  ? lang === 'vi'
                    ? 'Gộp lại iPhone 3D'
                    : 'Assemble 3D Layers'
                  : lang === 'vi'
                  ? 'Tách lớp iPhone 3D'
                  : 'Explode 3D Layers'}
              </span>
            </MagneticButton>

            <a
              href="#work"
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold transition hover:opacity-80"
              style={{ color: 'var(--ink-2)' }}
            >
              <span>{lang === 'vi' ? 'Xem dự án' : 'Selected Work'}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4"
            style={{ borderColor: 'var(--border)' }}
          >
            {stats.map((s) => (
              <div key={s.labelEn} className="flex flex-col">
                <span
                  className="font-mono text-2xl font-extrabold tracking-tight"
                  style={{ color: 'var(--ink)' }}
                >
                  {s.value}
                </span>
                <span className="mt-0.5 text-xs" style={{ color: 'var(--ink-3)' }}>
                  {lang === 'vi' ? s.labelVi : s.labelEn}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Playable & Explodable 3D Titanium iPhone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <InteractiveDevice3D />
        </motion.div>
      </div>

      {/* Infinite Core Stack Marquee */}
      <div
        className="mt-10 border-y py-3.5 backdrop-blur-xl"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        <div className="container-x marquee-mask flex items-center gap-4 overflow-hidden">
          <span
            className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: 'var(--accent)' }}
          >
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            Core Stack
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div className="animate-marquee flex gap-8 whitespace-nowrap will-change-transform">
              {[...techMarquee, ...techMarquee].map((tech, idx) => (
                <span
                  key={`${tech}-${idx}`}
                  className="font-mono text-xs font-semibold transition-colors"
                  style={{ color: 'var(--ink-2)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
