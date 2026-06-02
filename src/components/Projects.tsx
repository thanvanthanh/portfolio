'use client';

import { useEffect, useRef } from 'react';
import { projects } from '~/data/portfolio';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('article[data-card]');
    if (!cards) return;

    const onScroll = () => {
      const vh = window.innerHeight;
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / vh));
        const bg = card.querySelector('[data-bg]') as HTMLElement | null;
        if (bg) {
          bg.style.transform = `translate3d(0, ${(progress - 0.5) * -60}px, 0) scale(1.08)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="work" className="relative bg-[var(--bg)]">
      <div className="container-x pt-12 pb-28 md:pt-20 md:pb-36">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-accent">Selected work</p>
          <h2 className="mt-4 display-1">
            <span className="block">Apps that shipped.</span>
            <span className="block">
              And were <span className="gradient-text">loved.</span>
            </span>
          </h2>
          <p className="lede mt-6 max-w-2xl">
            Một vài sản phẩm tiêu biểu — từ ý tưởng đầu tiên đến App Store. Cuộn xuống để theo từng câu chuyện.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="container-x grid gap-6 pb-12 md:gap-8">
        {projects.map((p, index) => (
          <article
            key={p.name}
            data-card
            className="reveal card-grad relative isolate flex min-h-[520px] flex-col gap-10 overflow-hidden p-8 md:min-h-[640px] md:gap-16 md:p-14"
            style={{
              background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
              boxShadow: `0 40px 80px -30px ${p.accent}66`,
            }}
          >
            {p.image && (
              <div
                data-bg
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden will-change-transform"
              >
                <img
                  src={p.image}
                  alt=""
                  className="h-full w-full object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
                  style={{
                    animation: 'ken-burns 18s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${p.gradient[0]}cc, ${p.gradient[1]}b3)`,
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    animation: 'card-shine 6s ease-in-out infinite',
                    animationDelay: `${index * 1.2}s`,
                  }}
                />
              </div>
            )}

            <header className="relative flex items-center justify-between text-white/90">
              <span className="text-[12px] uppercase tracking-[0.2em]">
                {p.role}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[12px] backdrop-blur">
                {p.year}
              </span>
            </header>

            <div className="relative">
              <h3 className="text-[56px] font-bold leading-[1.02] tracking-tighter text-white md:text-[88px]">
                {p.name}
              </h3>
            </div>

            <div className="relative mt-auto max-w-[560px]">
              <p className="text-[20px] font-semibold leading-snug tracking-tight text-white md:text-[26px]">
                {p.tagline}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85 md:text-[17px]">
                {p.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/40 bg-white/5 px-3 py-1 text-[13px] text-white backdrop-blur"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
