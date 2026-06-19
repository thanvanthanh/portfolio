'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset all reveal elements, then immediately show those in the viewport.
    // Re-runs on every route change so back-navigation works correctly.
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    els.forEach((el) => el.classList.remove('in'));

    const inViewport = els.filter((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      return top < window.innerHeight && bottom > 0;
    });
    inViewport.forEach((el) => el.classList.add('in'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    els.filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
