import { profile, techMarquee } from '~/data/portfolio';

const heroSlides = [
  {
    src: '/hero/yogiyo.jpg',
    name: 'Yogiyo',
    tone: 'from-[#FF0844] to-[#FFB199]',
    shadow: 'shadow-rose-500/30',
  },
  {
    src: '/hero/vnasa.jpg',
    name: 'VNASA',
    tone: 'from-[#0071e3] to-[#1d4ed8]',
    shadow: 'shadow-sky-500/30',
  },
  {
    src: '/hero/photoism.jpg',
    name: 'Photoism',
    tone: 'from-[#11998E] to-[#38EF7D]',
    shadow: 'shadow-emerald-500/30',
  },
  {
    src: '/hero/toyota.jpg',
    name: 'Toyota Wallet',
    tone: 'from-[#243949] to-[#517FA4]',
    shadow: 'shadow-slate-500/30',
  },
  {
    src: '/projects/probit.jpg',
    name: 'ProBit Global',
    tone: 'from-[#1d6ee0] to-[#326ba4]',
    shadow: 'shadow-blue-500/30',
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
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

      <div className="container-x pt-28 pb-24 md:pt-40 md:pb-32">
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

        <div className="reveal mt-20 md:mt-28">
          <div className="relative mx-auto h-[540px] w-full max-w-md md:h-[680px] md:max-w-5xl">
            <div
              className="absolute bottom-[6%] left-0 z-0 hidden md:block animate-[float_7s_ease-in-out_infinite]"
              style={{ animationDelay: '-2s' }}
            >
              <div className="group aspect-[3/6] w-[200px] -rotate-[10deg] rounded-[36px] bg-gradient-to-br from-[#11998E] to-[#38EF7D] p-[5px] shadow-2xl shadow-emerald-500/30 transition-transform duration-500 ease-out hover:-translate-y-3 hover:-rotate-[4deg] hover:scale-[1.05]">
                <div className="relative h-full overflow-hidden rounded-[31px] bg-black">
                  <img
                    src="/hero/photoism.jpg"
                    alt="Photoism"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-[6%] right-0 z-0 hidden md:block animate-[float_8s_ease-in-out_infinite]"
              style={{ animationDelay: '-4s' }}
            >
              <div className="group aspect-[3/6] w-[200px] rotate-[10deg] rounded-[36px] bg-gradient-to-br from-[#FF0844] to-[#FFB199] p-[5px] shadow-2xl shadow-rose-500/30 transition-transform duration-500 ease-out hover:-translate-y-3 hover:rotate-[4deg] hover:scale-[1.05]">
                <div className="relative h-full overflow-hidden rounded-[31px] bg-black">
                  <img
                    src="/hero/toyota.jpg"
                    alt="Toyota Wallet"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 animate-[float_6s_ease-in-out_infinite]">
              <div className="group relative aspect-[3/6] w-[260px] rounded-[44px] bg-gradient-to-b from-[#1d1d1f] to-black p-[6px] shadow-[0_40px_100px_-30px_rgba(0,113,227,0.55)] transition-transform duration-500 ease-out hover:-translate-y-3 hover:scale-[1.03] md:w-[300px]">
                <div className="relative h-full overflow-hidden rounded-[38px] bg-black">
                  <img
                    src="/hero/yogiyo.jpg"
                    alt="Yogiyo"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute left-1/2 top-3 z-10 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[60px] bg-gradient-to-tr from-sky-200/50 to-indigo-200/40 blur-2xl" />
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
