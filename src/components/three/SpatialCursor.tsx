'use client';

import { useEffect, useRef, useState } from 'react';

export default function SpatialCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canHover =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover) return;
    setEnabled(true);

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, [role="button"], .phone-rig, canvas'),
      );
      setHovered(isInteractive);
    };

    const onDown = (e: PointerEvent) => {
      const ripple = rippleRef.current;
      if (!ripple) return;
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.classList.remove('cursor-ripple-active');
      void ripple.offsetWidth;
      ripple.classList.add('cursor-ripple-active');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
      {/* Outer Magnetic Spatial Ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full transition-[width,height,margin,border-color,background-color] duration-200"
        style={{
          width: hovered ? '52px' : '36px',
          height: hovered ? '52px' : '36px',
          marginLeft: hovered ? '-26px' : '-18px',
          marginTop: hovered ? '-26px' : '-18px',
          border: hovered
            ? '1.5px solid rgba(16, 185, 129, 0.75)'
            : '1px solid rgba(56, 189, 248, 0.45)',
          background: hovered ? 'rgba(16, 185, 129, 0.08)' : 'rgba(56, 189, 248, 0.03)',
          boxShadow: hovered
            ? '0 0 24px rgba(16, 185, 129, 0.35)'
            : '0 0 16px rgba(56, 189, 248, 0.2)',
        }}
      />

      {/* Precision Center Core Dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full"
        style={{
          background: hovered ? '#10b981' : '#38bdf8',
          boxShadow: '0 0 10px currentColor',
        }}
      />

      {/* Click Shockwave Ring */}
      <div
        ref={rippleRef}
        className="fixed -ml-6 -mt-6 h-12 w-12 rounded-full border border-sky-400/70 opacity-0"
      />
    </div>
  );
}
