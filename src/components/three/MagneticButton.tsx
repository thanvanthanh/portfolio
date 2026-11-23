'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  strength?: number;
  ariaLabel?: string;
  style?: React.CSSProperties;
};

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  type = 'button',
  strength = 0.22,
  ariaLabel,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = Math.max(-14, Math.min(14, (e.clientX - (r.left + r.width / 2)) * strength));
    const dy = Math.max(-10, Math.min(10, (e.clientY - (r.top + r.height / 2)) * strength));
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  const sharedProps = {
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    'aria-label': ariaLabel,
    style,
    className: `transition-[transform,box-shadow,filter,background-color] duration-200 ease-out will-change-transform ${className}`,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...sharedProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      {...sharedProps}
    >
      {children}
    </button>
  );
}
