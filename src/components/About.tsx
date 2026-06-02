import { stats } from '~/data/portfolio';

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden
      >
        <div
          className="absolute left-[10%] top-[20%] h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(0,113,227,0.35), transparent 60%)',
          }}
        />
        <div
          className="absolute right-[5%] bottom-[10%] h-[460px] w-[460px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(142,92,217,0.35), transparent 60%)',
          }}
        />
      </div>

      <div className="container-x py-28 md:py-36">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-white/60">About</p>
          <h2 className="mt-4 display-1">
            <span className="block">I make mobile apps that</span>
            <span className="block gradient-text">feel inevitable.</span>
          </h2>
          <p className="lede mt-6 text-white/70">
            Tôi tin một ứng dụng tốt là khi người dùng quên mất họ đang dùng phần mềm.
            Sau hơn 5 năm với Swift, Objective-C và Flutter — từ mobile banking, fintech tới super-app doanh nghiệp —
            tôi vẫn giữ nguyên tiêu chuẩn đó cho mỗi sản phẩm tôi chạm tay vào.
          </p>
        </div>

        <div className="reveal mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="bg-gradient-to-r from-[#0071e3] to-[#8e5cd9] bg-clip-text text-[44px] font-bold leading-[1.1] tracking-tighter text-transparent md:text-[64px]">
                {s.value}
              </div>
              <div className="mt-3 text-[13px] uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-24 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
            <div className="text-2xl">🎯</div>
            <h3 className="mt-4 text-lg font-semibold">Performance first</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/65">
              120fps scroll, sub-second startup, dùng đúng công cụ profiler trước khi gõ code mới.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
            <div className="text-2xl">🪞</div>
            <h3 className="mt-4 text-lg font-semibold">Detail obsessed</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/65">
              Haptics, motion curves, kerning — những thứ người dùng cảm nhận trước cả khi nhận ra.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
            <div className="text-2xl">🌱</div>
            <h3 className="mt-4 text-lg font-semibold">Ship & learn</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/65">
              Khởi đầu nhỏ, đo đạc thật, lặp lại nhanh. Sản phẩm tốt là sản phẩm được dùng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
