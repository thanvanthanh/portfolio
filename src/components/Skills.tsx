import { skills } from '~/data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="relative bg-[var(--bg)]">
      <div className="container-x py-28 md:py-36">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-accent">Skills</p>
          <h2 className="mt-4 display-1">The tools, sharpened.</h2>
          <p className="lede mt-6 max-w-2xl">
            A toolkit honed across many shipped products — broad enough to take an idea from napkin to App Store, deep enough to hunt down the toughest bugs.
          </p>
        </div>

        <div className="reveal mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <div key={s.name} className="group relative">
              <div className="flex h-full min-h-[180px] flex-col justify-between gap-6 rounded-2xl bg-gradient-to-br from-white to-ink-100 p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)]">
                {s.icon ? (
                  <img
                    src={s.icon}
                    alt={s.name}
                    className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="text-[36px] leading-none">{s.emoji}</div>
                )}
                <div>
                  <div className="text-[18px] font-semibold tracking-tight">
                    {s.name}
                  </div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-ink-400">
                    {s.level}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
