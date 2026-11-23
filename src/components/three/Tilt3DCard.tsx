'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';

type Tilt3DCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
};

export default function Tilt3DCard({
  children,
  className = '',
  maxTilt = 10,
  onClick,
  role,
  tabIndex,
  ariaLabel,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;

    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      style={{ transformStyle: 'preserve-3d' }}
      className={`spatial-glass spotlight-card transition-[transform,border-color,box-shadow] duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
