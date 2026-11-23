'use client';

import { useRef, useState, type MouseEvent } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, Copy, Check, ArrowUpRight, FileText } from 'lucide-react';
import { profile } from '~/data/portfolio';
import { usePortfolio } from '~/components/PortfolioProvider';
import MagneticButton from '~/components/three/MagneticButton';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.37 9.74v-8.37H5.09v8.37h2.74z" />
    </svg>
  );
}

export default function Contact() {
  const { lang } = usePortfolio();
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const foilRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1200px) rotateX(${((0.5 - py) * 12).toFixed(2)}deg) rotateY(${((px - 0.5) * 14).toFixed(2)}deg)`;
    if (foilRef.current) {
      foilRef.current.style.backgroundPosition = `${px * 100}% ${py * 100}%`;
    }
  };

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }
  };

  const copyText = (text: string, kind: 'email' | 'phone') => {
    navigator.clipboard?.writeText(text).catch(() => {});
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.78 },
      colors: ['#38bdf8', '#10b981', '#a78bfa', '#ffffff'],
    });
    setCopied(kind);
    setTimeout(() => setCopied(null), 2400);
  };

  return (
    <section id="contact" className="relative z-10 py-20 md:py-28">
      <div className="container-x">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ transformStyle: 'preserve-3d' }}
          className="spatial-glass relative mx-auto max-w-4xl overflow-hidden rounded-[38px] p-8 text-center transition-transform duration-200 ease-out sm:p-14"
        >
          {/* Holographic Titanium Foil Overlay */}
          <div
            ref={foilRef}
            aria-hidden="true"
            className="holo-foil pointer-events-none absolute inset-0 opacity-70"
          />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-semibold"
              style={{
                background: 'rgba(16, 185, 129, 0.14)',
                border: '1px solid rgba(16, 185, 129, 0.34)',
                color: 'var(--emerald)',
              }}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HOLOGRAPHIC SPATIAL CONTACT</span>
            </div>

            <h2 className="display-1 mt-5 font-display" style={{ color: 'var(--ink)' }}>
              {lang === 'vi' ? (
                <>
                  Sẵn sàng kiến tạo sản phẩm{' '}
                  <span className="grad-text">đột phá tiếp theo?</span>
                </>
              ) : (
                <>
                  Ready to craft your next{' '}
                  <span className="grad-text">flagship product?</span>
                </>
              )}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base" style={{ color: 'var(--ink-2)' }}>
              {profile.location} · iOS &amp; Flutter Architecture · AI-Native Workflows &amp; MCP Systems
            </p>

            {/* Quick Copy Magnetic Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <MagneticButton
                onClick={() => copyText(profile.email, 'email')}
                className="inline-flex cursor-pointer items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                  boxShadow: '0 14px 36px rgba(37, 99, 235, 0.42)',
                }}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{profile.email}</span>
                {copied === 'email' ? (
                  <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4 opacity-70" aria-hidden="true" />
                )}
              </MagneticButton>

              <MagneticButton
                onClick={() => copyText(profile.phone, 'phone')}
                className="spatial-glass inline-flex cursor-pointer items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold"
                style={{ color: 'var(--ink)' }}
              >
                <Phone className="h-4 w-4" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span>{profile.phone}</span>
                {copied === 'phone' ? (
                  <Check className="h-4 w-4" style={{ color: 'var(--emerald)' }} aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4 opacity-60" aria-hidden="true" />
                )}
              </MagneticButton>
            </div>

            {/* Social & CV Row */}
            <div
              className="mt-9 flex flex-wrap items-center justify-center gap-6 border-t pt-7 text-sm"
              style={{ borderColor: 'var(--border)' }}
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-medium transition hover:opacity-80"
                style={{ color: 'var(--ink-2)' }}
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-medium transition hover:opacity-80"
                style={{ color: 'var(--ink-2)' }}
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
              </a>

              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold transition hover:opacity-80"
                style={{ color: 'var(--accent)' }}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>{lang === 'vi' ? 'Xem CV đầy đủ' : 'View Full CV'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-7 font-mono text-xs sm:flex-row"
          style={{ borderColor: 'var(--border)', color: 'var(--ink-3)' }}
        >
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-5 w-5 rounded-full object-cover opacity-85"
            />
            <span>© 2026 {profile.name}</span>
          </div>
          <div>{profile.location}</div>
        </footer>
      </div>
    </section>
  );
}
