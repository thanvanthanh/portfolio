'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Layers,
  RotateCw,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Activity,
  Cpu,
} from 'lucide-react';
import { usePortfolio } from '~/components/PortfolioProvider';

type PhoneAppId = 'tcb' | 'yogiyo' | 'vnasa' | 'photoism' | 'snapism' | 'toyota';

const APP_TABS: {
  id: PhoneAppId;
  label: string;
  huds: [string, string, string];
  metric: string;
  glow: string;
  beamColor: string;
}[] = [
  {
    id: 'tcb',
    label: 'Techcombank',
    huds: ['Hyper-P iOS', 'Kiro + MCP', 'Adobe AEM'],
    metric: 'Retail Banking Flagship',
    glow: 'radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(37,99,235,0.4) 55%, transparent 74%)',
    beamColor: 'rgba(239, 68, 68, 0.55)',
  },
  {
    id: 'yogiyo',
    label: 'Yogiyo',
    huds: ['3M+ Users', 'Datadog', 'Tuist'],
    metric: '3,000,000+ Active Users',
    glow: 'radial-gradient(circle, rgba(244,63,94,0.6) 0%, rgba(251,113,133,0.35) 55%, transparent 74%)',
    beamColor: 'rgba(244, 63, 94, 0.55)',
  },
  {
    id: 'vnasa',
    label: 'VNASA',
    huds: ['Flutter Lead', 'BLoC', 'Fastlane'],
    metric: '15,000+ Enterprise Staff',
    glow: 'radial-gradient(circle, rgba(14,165,233,0.6) 0%, rgba(29,78,216,0.4) 55%, transparent 74%)',
    beamColor: 'rgba(56, 189, 248, 0.55)',
  },
  {
    id: 'photoism',
    label: 'Photoism',
    huds: ['SwiftUI', 'TCA', 'KakaoSDK'],
    metric: 'Korea #1 Kiosk App',
    glow: 'radial-gradient(circle, rgba(20,184,166,0.6) 0%, rgba(16,185,129,0.4) 55%, transparent 74%)',
    beamColor: 'rgba(20, 184, 166, 0.55)',
  },
  {
    id: 'snapism',
    label: 'Snapism',
    huds: ['MVP Arch', 'SnapKit', 'Print Hardware'],
    metric: 'App Store Korea',
    glow: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(37,99,235,0.4) 55%, transparent 74%)',
    beamColor: 'rgba(59, 130, 246, 0.55)',
  },
  {
    id: 'toyota',
    label: 'Toyota Wallet',
    huds: ['VIPER + Clean', 'RxSwift', 'E-Wallet'],
    metric: 'Japan Fintech Enterprise',
    glow: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(56,189,248,0.4) 55%, transparent 74%)',
    beamColor: 'rgba(99, 102, 241, 0.55)',
  },
];

export default function InteractiveDevice3D() {
  const { lang, heroExploded, toggleHeroExploded } = usePortfolio();
  const [activeApp, setActiveApp] = useState<PhoneAppId>('tcb');
  const [islandOpen, setIslandOpen] = useState(true);

  const [tcbBalance, setTcbBalance] = useState(14);
  const [yogiyoApplied, setYogiyoApplied] = useState(false);

  const rigRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ rx: 8, ry: -18, trx: 8, try: -18, dragging: false, lx: 0, ly: 0 });

  useEffect(() => {
    if (heroExploded) {
      rotRef.current.trx = 15;
      rotRef.current.try = -38;
    } else {
      rotRef.current.trx = 8;
      rotRef.current.try = -18;
    }
  }, [heroExploded]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (document.hidden) return;
      const r = rotRef.current;
      const driftY = r.dragging || prefersReduced ? 0 : Math.sin(Date.now() * 0.0015) * 5.5;
      const driftX = r.dragging || prefersReduced ? 0 : Math.cos(Date.now() * 0.0012) * 2.2;
      r.rx += (r.trx + driftX - r.rx) * 0.1;
      r.ry += (r.try + driftY - r.ry) * 0.09;

      if (rigRef.current) {
        rigRef.current.style.transform = `rotateX(${r.rx.toFixed(2)}deg) rotateY(${r.ry.toFixed(2)}deg)`;
      }
      if (glareRef.current) {
        const norm = ((r.ry % 360) + 360) % 360;
        glareRef.current.style.opacity = norm > 90 && norm < 270 ? '0' : '0.32';
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, input')) return;
    rotRef.current.dragging = true;
    rotRef.current.lx = e.clientX;
    rotRef.current.ly = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rotRef.current.dragging) return;
    const dx = e.clientX - rotRef.current.lx;
    const dy = e.clientY - rotRef.current.ly;
    rotRef.current.try += dx * 0.58;
    rotRef.current.trx = Math.max(-38, Math.min(38, rotRef.current.trx - dy * 0.44));
    rotRef.current.lx = e.clientX;
    rotRef.current.ly = e.clientY;
  };

  const handlePointerUp = () => {
    rotRef.current.dragging = false;
  };

  const handleFlip = () => {
    rotRef.current.try += 180;
  };

  const currentTab = APP_TABS.find((t) => t.id === activeApp) ?? APP_TABS[0];

  const tcbTier =
    tcbBalance < 8
      ? {
          name: 'INSPIRE',
          cashback: '+1.0%',
          lounge: '2x / yr',
          glow: 'radial-gradient(circle, rgba(56,189,248,0.6) 0%, rgba(37,99,235,0.38) 55%, transparent 74%)',
        }
      : tcbBalance < 20
      ? {
          name: 'PRIORITY',
          cashback: '+2.0%',
          lounge: '6x / yr',
          glow: 'radial-gradient(circle, rgba(239,68,68,0.62) 0%, rgba(245,158,11,0.36) 55%, transparent 74%)',
        }
      : {
          name: 'PRIVATE',
          cashback: '+3.5%',
          lounge: 'Unlimited',
          glow: 'radial-gradient(circle, rgba(245,158,11,0.65) 0%, rgba(167,139,250,0.4) 55%, transparent 74%)',
        };

  const activeGlow = activeApp === 'tcb' ? tcbTier.glow : currentTab.glow;

  return (
    <div className="flex flex-col items-center">
      {/* Top 3D Control Cockpit Bar */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px]">
        <span
          className="rounded-full px-3 py-1"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--ink-2)',
          }}
        >
          {lang === 'vi'
            ? 'Kéo xoay 360° · Bấm tương tác trực tiếp'
            : 'Drag 360° · Interactive Spatial OS'}
        </span>

        <button
          type="button"
          onClick={toggleHeroExploded}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1 font-semibold transition hover:scale-105"
          style={{
            background: heroExploded
              ? 'linear-gradient(135deg, #10b981, #0284c7)'
              : 'rgba(16, 185, 129, 0.16)',
            border: '1px solid rgba(16, 185, 129, 0.45)',
            color: heroExploded ? '#ffffff' : 'var(--emerald)',
            boxShadow: heroExploded ? '0 0 24px rgba(16,185,129,0.5)' : 'none',
          }}
        >
          <Layers className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            {heroExploded
              ? lang === 'vi'
                ? 'Gộp 4 Lớp 3D'
                : 'Assemble 4 Planes'
              : lang === 'vi'
              ? 'Tách 4 Lớp 3D'
              : 'Explode 3D Planes'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleFlip}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition hover:scale-105"
          style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.42)',
            color: 'var(--accent)',
          }}
        >
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{lang === 'vi' ? 'Lật 180°' : 'Flip 180°'}</span>
        </button>
      </div>

      {/* 3D Perspective Stage with Holographic Projection Pedestal */}
      <div className="phone-viewport relative flex items-center justify-center px-8 py-5 sm:px-16">
        {/* Dynamic Volumetric Halo */}
        <div
          className="pointer-events-none absolute h-96 w-96 rounded-full blur-3xl transition-all duration-500"
          style={{ background: activeGlow }}
        />

        {/* 3D Holographic Projection Floor Rings underneath the floating iPhone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 flex items-center justify-center"
          style={{
            width: '340px',
            height: '340px',
            transform: 'rotateX(76deg) translateZ(-20px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="holo-pedestal-ring absolute inset-0 rounded-full border-2 border-dashed"
            style={{
              borderColor: currentTab.beamColor,
              boxShadow: `0 0 40px ${currentTab.beamColor}, inset 0 0 30px ${currentTab.beamColor}`,
            }}
          />
          <div
            className="holo-pedestal-ring-rev absolute inset-10 rounded-full border"
            style={{
              borderColor: 'rgba(56, 189, 248, 0.45)',
            }}
          />
          <div
            className="absolute inset-20 rounded-full opacity-55 blur-md"
            style={{ background: activeGlow }}
          />
        </div>

        <div
          ref={rigRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`phone-rig ${heroExploded ? 'is-exploded' : ''}`}
          aria-label="Interactive 3D Titanium iPhone Showcase"
        >
          {/* Layer 1: Extruded 3D Titanium Chassis */}
          <div className="phone-layer p-chassis-group">
            {[8, 6, 4, 2, 0, -2, -4, -6, -8].map((z) => (
              <div
                key={z}
                className="p-slice"
                style={{ transform: `translateZ(${z}px)` }}
              />
            ))}
          </div>

          {/* Back Titanium Matte Glass + Triple Pro Camera */}
          <div className="phone-layer p-back-face">
            <div className="cam-bump">
              <div className="cam-lens" style={{ top: '11px', left: '11px' }} />
              <div className="cam-lens" style={{ bottom: '11px', left: '11px' }} />
              <div className="cam-lens" style={{ top: '36px', right: '11px' }} />
              <div className="absolute right-4 top-3.5 h-3.5 w-3.5 rounded-full bg-amber-100/80" />
              <div className="absolute bottom-3.5 right-4 h-3.5 w-3.5 rounded-full border border-slate-600 bg-black" />
            </div>
            <div className="my-auto text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 font-mono text-sm font-bold text-sky-300 shadow-inner">
                VT
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300">
                TITANIUM · SPATIAL 3D
              </div>
            </div>
            <div className="text-center font-mono text-[10px] text-slate-400">
              Than Van Thanh · 120Hz iOS Pro
            </div>
          </div>

          {/* Layer 2: Internal Mobile Architecture Core (Revealed when Exploded!) */}
          <div className="phone-layer p-core-layer text-white">
            <div className="flex items-center justify-between font-mono text-[11px] text-emerald-300">
              <span>MOBILE CORE</span>
              <span>Z-PLANE 02</span>
            </div>
            <div className="my-auto space-y-2.5">
              <div className="rounded-xl border border-emerald-400/40 bg-black/60 p-3 font-mono text-[11px]">
                <div className="font-bold text-emerald-300">MVVM + Clean + TCA + VIPER</div>
                <div className="mt-1 text-slate-300">RxSwift · Combine · Multi-Module</div>
              </div>
              <div className="rounded-xl border border-sky-400/40 bg-black/60 p-3 font-mono text-[11px]">
                <div className="font-bold text-sky-300">AI-Native Mobile Workflow</div>
                <div className="mt-1 text-slate-300">Kiro · Figma/Jira MCP · Fastlane</div>
              </div>
            </div>
            <div className="text-center font-mono text-[10px] text-emerald-200/80">
              Exploded 3D Architecture View
            </div>
          </div>

          {/* Layer 3: Front Titanium Bezel + Playable OLED Screen */}
          <div className="phone-layer p-front-layer">
            <div className="p-oled flex flex-col justify-between p-4 text-white">
              {/* Laser Scanline Sheen */}
              <div className="phone-scanline pointer-events-none absolute inset-x-0 top-0 z-10 h-16" />

              {/* Status Bar & Clickable Dynamic Island */}
              <div className="relative z-30 flex items-center justify-between text-[11px] font-semibold">
                <span>9:41</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIslandOpen((v) => !v);
                  }}
                  aria-label="Toggle Dynamic Island Telemetry"
                  className="flex cursor-pointer items-center justify-between gap-2 rounded-full border border-white/15 bg-black px-2.5 py-1 transition-all duration-300"
                  style={{ minWidth: islandOpen ? '156px' : '84px' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {islandOpen && (
                    <span className="font-mono text-[10px] text-emerald-300">
                      Swift · 120fps OK
                    </span>
                  )}
                  <span className="h-2 w-2 rounded-full border border-blue-400/60 bg-blue-950" />
                </button>
                <span className="font-mono text-[10px]">5G</span>
              </div>

              {/* Screen Body (Strictly Mobile Apps) */}
              <div className="relative z-20 my-auto flex flex-col gap-3">
                {activeApp === 'tcb' && (
                  <>
                    <div
                      className="rounded-2xl border border-rose-500/40 p-3.5 shadow-lg"
                      style={{ background: 'linear-gradient(150deg, #2d0912, #0d1323)' }}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-rose-300">
                        <span>TECHCOMBANK HYPER-P</span>
                        <span className="rounded bg-rose-500/25 px-1.5 py-0.5 font-bold">
                          {tcbTier.name}
                        </span>
                      </div>
                      <div className="mt-2 text-sm font-extrabold text-white">
                        Tier Upgrade Calculator
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex justify-between text-[10px] text-slate-300">
                          <span>Avg. Balance</span>
                          <span className="font-mono font-bold text-amber-300">
                            {(tcbBalance / 10).toFixed(1)}B VND
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={30}
                          value={tcbBalance}
                          onChange={(e) => setTcbBalance(Number(e.target.value))}
                          aria-label="Adjust Techcombank Hyper-P tier balance"
                          className="tcb-slider"
                        />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                        <div className="rounded-xl border border-white/10 bg-black/45 p-2">
                          <div className="text-[9px] text-slate-400">Cashback</div>
                          <div className="font-mono text-xs font-bold text-emerald-400">
                            {tcbTier.cashback}
                          </div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/45 p-2">
                          <div className="text-[9px] text-slate-400">Lounge</div>
                          <div className="font-mono text-xs font-bold text-sky-300">
                            {tcbTier.lounge}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px]">
                      <span className="text-slate-300">
                        {lang === 'vi' ? 'Kéo thanh trên để đổi hạng' : 'Drag slider to test'}
                      </span>
                      <span className="font-mono text-emerald-400">AEM + RxSwift</span>
                    </div>
                  </>
                )}

                {activeApp === 'yogiyo' && (
                  <div className="overflow-hidden rounded-2xl border border-rose-400/35 bg-[#120b14]">
                    <div className="relative h-44 w-full">
                      <img
                        src="/hero/yogiyo.jpg"
                        alt="Yogiyo App"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120b14] via-black/35 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <div className="font-mono text-[10px] text-rose-300">KOREA #2 DELIVERY</div>
                        <div className="text-base font-extrabold text-white">Yogiyo App</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <button
                        type="button"
                        onClick={() => setYogiyoApplied((v) => !v)}
                        className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold text-white transition"
                        style={{ background: yogiyoApplied ? '#10b981' : '#f43f5e' }}
                      >
                        {yogiyoApplied ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Voucher Applied · Datadog OK</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Test ₩5,000 Voucher</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeApp === 'vnasa' && (
                  <div className="overflow-hidden rounded-2xl border border-sky-400/35 bg-[#081524]">
                    <div className="relative h-48 w-full">
                      <img
                        src="/hero/vna-app.png"
                        alt="VNASA Super-App"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081524] via-black/30 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <div className="font-mono text-[10px] text-sky-300">VIETNAM AIRLINES</div>
                        <div className="text-base font-extrabold text-white">VNASA Super-App</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 font-mono text-[11px] text-slate-300">
                      <span>SkyIdea · KPI</span>
                      <span className="text-sky-300">Flutter · BLoC</span>
                    </div>
                  </div>
                )}

                {activeApp === 'photoism' && (
                  <div className="overflow-hidden rounded-2xl border border-teal-400/35 bg-[#071c1b]">
                    <div className="relative h-48 w-full">
                      <img
                        src="/hero/photoism.jpg"
                        alt="PHOTOISM App"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071c1b] via-black/30 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <div className="font-mono text-[10px] text-teal-300">KOREA PHOTOBOOTH</div>
                        <div className="text-base font-extrabold text-white">PHOTOISM</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 font-mono text-[11px] text-slate-300">
                      <span>Frames &amp; Coupons</span>
                      <span className="text-teal-300">SwiftUI · TCA</span>
                    </div>
                  </div>
                )}

                {activeApp === 'snapism' && (
                  <div className="overflow-hidden rounded-2xl border border-blue-400/35 bg-[#091426]">
                    <div className="relative h-48 w-full">
                      <img
                        src="/hero/snapism.png"
                        alt="SNAPISM App"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091426] via-black/30 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <div className="font-mono text-[10px] text-sky-300">KIOSK HARDWARE PRINT</div>
                        <div className="text-base font-extrabold text-white">SNAPISM</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 font-mono text-[11px] text-slate-300">
                      <span>Print Flow · REST API</span>
                      <span className="text-sky-300">MVP · SnapKit</span>
                    </div>
                  </div>
                )}

                {activeApp === 'toyota' && (
                  <div className="overflow-hidden rounded-2xl border border-indigo-400/35 bg-[#0d1024]">
                    <div className="relative h-48 w-full">
                      <img
                        src="/hero/toyota.jpg"
                        alt="Toyota Wallet App"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1024] via-black/30 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <div className="font-mono text-[10px] text-indigo-300">JAPAN OFFICIAL E-WALLET</div>
                        <div className="text-base font-extrabold text-white">Toyota Wallet</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2.5 font-mono text-[11px] text-slate-300">
                      <span>E-Money · Credit</span>
                      <span className="text-indigo-300">VIPER · RxSwift</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Home Bar */}
              <div className="relative z-20 flex justify-center">
                <div className="h-1 w-24 rounded-full bg-white/45" />
              </div>

              {/* Glass Glare */}
              <div
                ref={glareRef}
                className="pointer-events-none absolute inset-0 z-10 opacity-28"
                style={{
                  background:
                    'linear-gradient(125deg, rgba(255,255,255,0.48) 0%, transparent 45%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* Layer 4: Rich Spatial VisionOS Telemetry Cards Orbiting in 3D Z-Space */}
          <div className="phone-layer p-hud-layer hidden sm:block">
            {/* Widget 1: Live 120Hz ProMotion Frame Pacing Card */}
            <div
              className="absolute -left-32 top-14 w-40 rounded-2xl p-2.5 font-mono text-[11px] text-white shadow-2xl"
              style={{
                background: 'rgba(8, 13, 26, 0.92)',
                border: '1px solid rgba(56, 189, 248, 0.55)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.75), 0 0 20px rgba(56,189,248,0.2)',
                transform: 'translateZ(24px)',
              }}
            >
              <div className="flex items-center justify-between text-[10px] text-sky-300">
                <span className="flex items-center gap-1">
                  <Activity className="h-3 w-3" aria-hidden="true" />
                  120Hz FPS
                </span>
                <span className="text-emerald-400">8.3ms</span>
              </div>
              <div className="mt-1.5 flex h-5 items-end gap-0.5">
                {[65, 85, 92, 78, 95, 88, 100, 90, 84, 96, 92, 98].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-sky-500 to-emerald-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-1.5 truncate font-semibold text-white">
                {currentTab.huds[0]}
              </div>
            </div>

            {/* Widget 2: Mobile Tech & Architecture Card */}
            <div
              className="absolute -right-32 top-44 w-40 rounded-2xl p-2.5 font-mono text-[11px] text-white shadow-2xl"
              style={{
                background: 'rgba(8, 13, 26, 0.92)',
                border: '1px solid rgba(16, 185, 129, 0.55)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.75), 0 0 20px rgba(16,185,129,0.22)',
                transform: 'translateZ(42px)',
              }}
            >
              <div className="flex items-center justify-between text-[10px] text-emerald-300">
                <span className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" aria-hidden="true" />
                  MOBILE STACK
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="mt-1 font-bold text-white">{currentTab.huds[1]}</div>
              <div className="mt-0.5 text-[10px] text-slate-400">Production Verified</div>
            </div>

            {/* Widget 3: Architecture & Scale Badge */}
            <div
              className="absolute -left-28 bottom-16 flex items-center gap-2 rounded-2xl px-3.5 py-2 font-mono text-xs font-semibold text-white shadow-2xl"
              style={{
                background: 'rgba(8, 13, 26, 0.92)',
                border: '1px solid rgba(167, 139, 250, 0.55)',
                boxShadow: '0 20px 45px rgba(0,0,0,0.75), 0 0 20px rgba(167,139,250,0.2)',
                transform: 'translateZ(18px)',
              }}
            >
              <ShieldAlert className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
              <div>
                <div className="text-[11px] font-bold">{currentTab.huds[2]}</div>
                <div className="text-[9px] text-violet-300">{currentTab.metric}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Switcher Pills (6 Production Mobile Apps) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {APP_TABS.map((tab) => {
          const active = tab.id === activeApp;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveApp(tab.id)}
              className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition hover:scale-105"
              style={
                active
                  ? {
                      background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                      color: '#ffffff',
                      border: '1px solid transparent',
                      boxShadow: '0 8px 22px rgba(37, 99, 235, 0.42)',
                    }
                  : {
                      background: 'var(--surface)',
                      color: 'var(--ink-2)',
                      border: '1px solid var(--border)',
                    }
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
