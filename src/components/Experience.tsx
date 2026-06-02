import { experiences } from '~/data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="relative bg-black text-white">
      <div className="container-x py-28 md:py-36">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-white/60">Experience</p>
          <h2 className="mt-4 display-1 text-white">
            <span className="block">A timeline of</span>
            <span className="block gradient-text">shipping things.</span>
          </h2>
        </div>

        <ol className="mt-16 space-y-12 md:space-y-16">
          {experiences.map((e, i) => (
            <li
              key={e.company}
              className="reveal grid grid-cols-[24px_1fr] gap-6 md:grid-cols-[180px_24px_1fr] md:gap-10"
            >
              <div className="hidden text-right text-[14px] tracking-tight text-white/60 md:block">
                {e.period}
              </div>
              <div className="relative">
                <div className="mt-2 h-3 w-3 rounded-full bg-gradient-to-br from-[#0071e3] to-[#8e5cd9] shadow-[0_0_24px_rgba(0,113,227,0.55)]" />
                {i < experiences.length - 1 && (
                  <div className="absolute left-1/2 top-5 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                )}
              </div>
              <div>
                <div className="text-[13px] uppercase tracking-[0.16em] text-white/55 md:hidden">
                  {e.period}
                </div>
                <h3 className="mt-2 text-[24px] font-semibold tracking-tight md:text-[32px]">
                  {e.role}
                </h3>
                <div className="bg-gradient-to-r from-[#0071e3] to-[#8e5cd9] bg-clip-text text-[18px] font-medium tracking-tight text-transparent md:text-[22px]">
                  {e.company}
                </div>
                <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-white/70">
                  {e.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-[15px] text-white/85"
                    >
                      <span className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
