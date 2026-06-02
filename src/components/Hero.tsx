'use client';

import { useEffect, useRef } from 'react';
import { profile, techMarquee } from '~/data/portfolio';

const heroSlides = [
  {
    src: '/hero/yogiyo.jpg',
    name: 'Yogiyo',
    role: 'Food delivery · Korea',
    tone: 'from-[#FF0844] to-[#FFB199]',
    shadow: 'shadow-rose-500/30',
  },
  {
    src: '/hero/photoism.jpg',
    name: 'Photoism',
    role: 'Photobooth · Korea',
    tone: 'from-[#11998E] to-[#38EF7D]',
    shadow: 'shadow-emerald-500/30',
  },
  {
    src: '/hero/toyota.jpg',
    name: 'Toyota Wallet',
    role: 'Fintech · Japan',
    tone: 'from-[#243949] to-[#517FA4]',
    shadow: 'shadow-slate-500/30',
  },
  {
    src: '/hero/snapism.jpg',
    name: 'Snapism',
    role: 'Photobooth · Korea',
    tone: 'from-[#0071e3] to-[#1d4ed8]',
    shadow: 'shadow-sky-500/30',
  },
  {
    src: '/hero/smart-learn.jpg',
    name: 'Smart Learn App',
    role: 'Education · Global',
    tone: 'from-[#1d6ee0] to-[#326ba4]',
    shadow: 'shadow-blue-500/30',
  },
];

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slides = heroSlides.length;
    const step = 360 / slides;

    let target = 0;
    let current = 0;
    let progress = 0;
    let lastActive = -1;
    let raf = 0;
    let needsRender = true;

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      progress = Math.max(0, Math.min(1, -rect.top / total));
      target = progress * step * (slides - 1);
    };

    const render = () => {
      const radius = Math.min(460, Math.max(220, window.innerWidth * 0.3));
      let active = 0;
      let bestAbs = Infinity;

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * step - current;
        const norm = ((angle + 540) % 360) - 180;
        const abs = Math.abs(norm);
        const scale = 1 - Math.min(0.35, abs / 360);
        const opacity = Math.max(0.18, 1 - abs / 200);
        el.style.transform = `translate3d(-50%, -50%, 0) rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`;
        el.style.opacity = String(opacity);
        if (abs < bestAbs) {
          bestAbs = abs;
          active = i;
        }
      });

      if (active !== lastActive) {
        lastActive = active;
        cardsRef.current.forEach((el, i) => {
          if (el) el.style.zIndex = String(i === active ? 100 : 50 - i);
        });
        const slide = heroSlides[active];
        if (labelRef.current) labelRef.current.textContent = slide.name;
        if (roleRef.current) roleRef.current.textContent = slide.role;
        if (counterRef.current) {
          counterRef.current.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides).padStart(2, '0')}`;
        }
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const tick = () => {
      raf = 0;
      const diff = target - current;
      const moving = Math.abs(diff) > 0.01;
      if (moving) {
        current += diff * 0.18;
      } else if (current !== target) {
        current = target;
      }
      if (moving || needsRender) {
        needsRender = false;
        render();
      }
      if (moving) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      computeTarget();
      needsRender = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    computeTarget();
    current = target;
    render();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-[-20%] h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(0,113,227,0.18), transparent 60%)',
          }}
        />
        <div
          className="absolute right-[-10%] top-[40%] h-[460px] w-[460px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(142,92,217,0.18), transparent 60%)',
          }}
        />
        <div
          className="absolute left-[-10%] top-[60%] h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255,84,112,0.14), transparent 60%)',
          }}
        />
      </div>

      <div className="container-x pt-28 pb-10 md:pt-40 md:pb-12">
        <div className="reveal mx-auto max-w-4xl text-center">
          <p className="eyebrow text-accent">{profile.title}</p>
          <h1 className="mt-5 display-hero">
            <span className="block">{profile.name}.</span>
            <span className="block gradient-text">Pixels with intent.</span>
          </h1>
          <p className="lede mx-auto mt-7 max-w-2xl">{profile.bio}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#work" className="pill pill-primary">
              View work
            </a>
            <a href="#contact" className="pill pill-ghost">
              Get in touch
              <span className="ml-1" aria-hidden>
                ›
              </span>
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-ink-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open for select mobile collaborations · {profile.location}
          </div>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `${heroSlides.length * 90 + 60}vh` }}
      >
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-[14%] mx-auto max-w-md text-center md:top-[10%]">
            <p className="eyebrow text-ink-500">Selected work, in motion</p>
          </div>

          <div
            className="relative h-[460px] w-full md:h-[640px]"
            style={{ perspective: '1400px' }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {heroSlides.map((s, i) => (
                <div
                  key={s.src}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div
                    className={`group relative aspect-[3/6] w-[200px] rounded-[36px] bg-gradient-to-br ${s.tone} p-[5px] shadow-2xl ${s.shadow} md:w-[260px]`}
                  >
                    <div className="relative h-full overflow-hidden rounded-[31px] bg-black">
                      <img
                        src={s.src}
                        alt={s.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute left-1/2 top-3 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-black/90 md:h-7 md:w-24" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute inset-x-0 bottom-4 px-4 text-white">
                        <div className="text-[15px] font-semibold tracking-tight md:text-[17px]">
                          {s.name}
                        </div>
                        <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/75">
                          {s.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto flex max-w-md flex-col items-center gap-3 px-6 text-center">
            <span
              ref={labelRef}
              className="text-[20px] font-semibold tracking-tight text-ink-900 md:text-[22px]"
            >
              Yogiyo
            </span>
            <span
              ref={roleRef}
              className="text-[12px] uppercase tracking-[0.22em] text-ink-500"
            >
              Food delivery · Korea
            </span>
            <div className="mt-1 flex w-full max-w-[220px] items-center gap-3">
              <span
                ref={counterRef}
                className="shrink-0 text-[11px] font-medium tracking-[0.3em] text-ink-500"
              >
                01 / {String(heroSlides.length).padStart(2, '0')}
              </span>
              <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-ink-200/70">
                <span
                  ref={progressBarRef}
                  className="absolute inset-y-0 left-0 block w-full origin-left bg-ink-900"
                  style={{ transform: 'scaleX(0)' }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-ink-200/60 bg-white/70 py-6 backdrop-blur">
        <div className="marquee container-x flex items-center gap-3 overflow-hidden">
          <span className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-ink-500">
            The toolkit
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex gap-10 whitespace-nowrap will-change-transform"
              style={{ animation: 'marquee 32s linear infinite' }}
            >
              {[...techMarquee, ...techMarquee].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="text-[14px] font-medium text-ink-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
