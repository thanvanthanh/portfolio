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
        const emoji = card.querySelector('[data-emoji]') as HTMLElement | null;
        if (emoji) {
          emoji.style.transform = `translate3d(${(progress - 0.5) * 60}px, ${(progress - 0.5) * -40
            }px, 0) rotate(${(progress - 0.5) * 6}deg)`;
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
          <h2 className="mt-4 h-1">
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
        {projects.map((p) => (
          <article
            key={p.name}
            data-card
            className="reveal card-grad relative isolate flex min-h-[520px] flex-col gap-10 p-8 md:min-h-[640px] md:gap-16 md:p-14"
            style={{
              background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
              boxShadow: `0 40px 80px -30px ${p.accent}66`,
            }}
          >
            <div
              data-emoji
              aria-hidden
              className="pointer-events-none absolute right-[-40px] top-1/2 -translate-y-1/2 select-none text-[180px] leading-none opacity-25 transition-transform duration-700 will-change-transform md:right-[-60px] md:text-[280px] md:opacity-30"
            >
              {p.emoji}
            </div>

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
