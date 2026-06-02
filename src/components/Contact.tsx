import { profile } from '~/data/portfolio';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbfbfd] to-[#e8e8ed]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-1/3 h-[680px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(0,113,227,0.18), transparent 60%)',
          }}
        />
      </div>

      <div className="container-x py-28 text-center md:py-40">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow text-accent">Contact</p>
          <h2 className="mt-4 display-1">
            <span className="block">Have an idea?</span>
            <span className="block gradient-text">Let&apos;s build it.</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-xl">
            Tôi luôn sẵn sàng cho các dự án mobile thú vị, đặc biệt là những app cần đến sự chăm chút từng chi tiết.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-[17px] font-medium text-white shadow-[0_18px_45px_-12px_rgba(0,113,227,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent"
          >
            <span>{profile.email}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </a>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 underline-offset-4 hover:text-accent hover:underline"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/80 underline-offset-4 hover:text-accent hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-ink/80 underline-offset-4 hover:text-accent hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-ink-200/60">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-8 text-[13px] text-ink-400 md:flex-row">
          <span>© 2026 {profile.name}. Crafted with Next.js.</span>
          <span>{profile.location}</span>
        </div>
      </footer>
    </section>
  );
}
