'use client';

import { useEffect, useRef, useState } from 'react';
import {
  skillGroups,
  skillConstellationTags,
  skillConstellationLinks,
} from '~/data/portfolio';
import { usePortfolio } from '~/components/PortfolioProvider';
import Tilt3DCard from '~/components/three/Tilt3DCard';

const FOCUS_KEYS = Object.keys(skillConstellationLinks);

export default function Skills() {
  const { theme, lang } = usePortfolio();
  const [focusedSkill, setFocusedSkill] = useState<string>('FastMCP');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusedRef = useRef(focusedSkill);
  const themeRef = useRef(theme);

  useEffect(() => {
    focusedRef.current = focusedSkill;
  }, [focusedSkill]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = skillConstellationTags.map((label, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / skillConstellationTags.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        label,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        sx: 0,
        sy: 0,
      };
    });

    let velX = 0.0028;
    let velY = 0.007;
    let dragging = false;
    let lx = 0;
    let ly = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lx) * 0.0032;
      velX = (e.clientY - ly) * 0.0032;
      lx = e.clientX;
      ly = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);

    let rafId = 0;
    const render = () => {
      rafId = requestAnimationFrame(render);
      if (document.hidden) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth || 340;
      const ch = canvas.clientHeight || 330;
      if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      const dark = themeRef.current === 'dark';
      if (!dragging) {
        const targetY = prefersReduced ? 0 : 0.0062;
        const targetX = prefersReduced ? 0 : 0.0024;
        velY += (targetY - velY) * 0.03;
        velX += (targetX - velX) * 0.03;
      }

      const cosY = Math.cos(velY);
      const sinY = Math.sin(velY);
      const cosX = Math.cos(velX);
      const sinX = Math.sin(velX);
      const R = Math.min(cw, ch) * 0.36;

      for (const n of nodes) {
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.z * cosY + n.x * sinY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y * sinX;
        n.x = x1;
        n.y = y2;
        n.z = z2;
        n.sx = cw / 2 + n.x * R;
        n.sy = ch / 2 + n.y * R;
      }

      // Subtle wireframe horizon ring
      ctx.strokeStyle = dark ? 'rgba(148,163,184,0.12)' : 'rgba(15,23,42,0.09)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cw / 2, ch / 2, R, 0, Math.PI * 2);
      ctx.stroke();

      const activeKey = focusedRef.current;
      const relSet = new Set(skillConstellationLinks[activeKey]?.related ?? []);
      const center = nodes.find((n) => n.label === activeKey);

      if (center) {
        for (const n of nodes) {
          if (!relSet.has(n.label)) continue;
          ctx.strokeStyle = dark
            ? 'rgba(16, 185, 129, 0.58)'
            : 'rgba(5, 150, 105, 0.55)';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(center.sx, center.sy);
          ctx.lineTo(n.sx, n.sy);
          ctx.stroke();
        }
      }

      const sorted = [...nodes].sort((a, b) => a.z - b.z);
      for (const n of sorted) {
        const depth = (n.z + 1.45) / 2.45;
        const isMain = n.label === activeKey;
        const isRel = relSet.has(n.label);
        const fontSize = isMain ? 15 : isRel ? 13 : Math.round(10 + depth * 4);
        ctx.font = `${isMain || isRel ? '700' : '600'} ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = isMain ? 1 : isRel ? 0.95 : Math.max(0.22, depth * 0.72);
        ctx.fillStyle = isMain
          ? dark
            ? '#34d399'
            : '#059669'
          : isRel
          ? dark
            ? '#38bdf8'
            : '#0284c7'
          : dark
          ? '#94a3b8'
          : '#475569';
        ctx.fillText(n.label, n.sx, n.sy);
      }
      ctx.globalAlpha = 1;
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const activeInfo = skillConstellationLinks[focusedSkill];

  return (
    <section id="skills" className="relative z-10 py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <div className="eyebrow">Technical Knowledge · 3D Constellation</div>
          <h2 className="display-1 mt-3 font-display" style={{ color: 'var(--ink)' }}>
            {lang === 'vi'
              ? 'Quả cầu Công nghệ 3D & Năng lực Cốt lõi'
              : 'Interactive 3D Skill Graph & Core Stack'}
          </h2>
          <p className="lede mt-3">
            {lang === 'vi'
              ? 'Kéo xoay quả cầu 3D hoặc chọn một công nghệ để làm sáng các tia kết nối hệ sinh thái giữa Mobile Native, Flutter và AI Engineering.'
              : 'Drag to orbit the 3D sphere or pick a core technology below to illuminate its production connections across iOS, Flutter, Go, Python, and MCP.'}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Left: Interactive 3D Rotating Tech Sphere */}
          <Tilt3DCard maxTilt={5} className="flex flex-col items-center rounded-[30px] p-5 lg:col-span-5">
            <div className="flex w-full items-center justify-between font-mono text-xs">
              <span style={{ color: 'var(--ink-3)' }}>3D ORBITAL SPHERE · DRAG</span>
              <span style={{ color: 'var(--emerald)' }}>ACTIVE: {focusedSkill}</span>
            </div>

            <canvas
              ref={canvasRef}
              className="mt-2 h-[320px] w-full max-w-[360px] cursor-grab active:cursor-grabbing"
              aria-label="Interactive 3D rotating skill constellation"
            />

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {FOCUS_KEYS.map((key) => {
                const active = key === focusedSkill;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFocusedSkill(key)}
                    className="cursor-pointer rounded-full px-3 py-1 font-mono text-xs font-semibold transition"
                    style={
                      active
                        ? {
                            background: 'linear-gradient(135deg, #10b981, #0284c7)',
                            color: '#ffffff',
                            border: '1px solid transparent',
                          }
                        : {
                            background: 'var(--surface-solid)',
                            color: 'var(--ink-2)',
                            border: '1px solid var(--border)',
                          }
                    }
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </Tilt3DCard>

          {/* Right: Active Context + 5 Structured CV Skill Modules */}
          <div className="space-y-4 lg:col-span-7">
            {activeInfo && (
              <div
                className="spatial-glass rounded-2xl p-4 font-mono text-xs leading-relaxed"
                style={{ borderColor: 'rgba(16, 185, 129, 0.35)' }}
              >
                <span className="font-bold" style={{ color: 'var(--emerald)' }}>
                  {focusedSkill}
                </span>{' '}
                <span style={{ color: 'var(--ink-2)' }}>
                  → {lang === 'vi' ? activeInfo.noteVi : activeInfo.noteEn}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => {
                const isEmerald = group.accent === 'emerald';
                const isWide = group.id === 'devops-sdks';
                const accentColor =
                  group.accent === 'emerald'
                    ? 'var(--emerald)'
                    : group.accent === 'violet'
                    ? 'var(--violet)'
                    : 'var(--accent)';

                return (
                  <Tilt3DCard
                    key={group.id}
                    maxTilt={6}
                    className={`rounded-3xl p-5 ${isWide ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold" style={{ color: 'var(--ink)' }}>
                        {lang === 'vi' ? group.titleVi : group.title}
                      </h3>
                      <span className="font-mono text-xs font-bold" style={{ color: accentColor }}>
                        {group.index}
                      </span>
                    </div>

                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg px-2.5 py-1 font-mono text-xs"
                          style={
                            isEmerald
                              ? {
                                  background: 'rgba(16, 185, 129, 0.12)',
                                  border: '1px solid rgba(16, 185, 129, 0.32)',
                                  color: 'var(--emerald)',
                                }
                              : {
                                  background: 'var(--surface-solid)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--ink-2)',
                                }
                          }
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Tilt3DCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
