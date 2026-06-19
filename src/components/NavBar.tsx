'use client';

import Link from 'next/link';
import { useState } from 'react';

const items = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        id="nav"
        className="glass fixed inset-x-0 top-0 z-50 h-12"
      >
        <nav className="container-x flex h-full items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
          >
            <span className="grid h-5 w-5 place-items-center rounded-md bg-ink text-white text-[10px]">
              ⌘
            </span>
            <span>
              Port<span className="text-ink-500">folio</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-[13px] text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/cv"
              className="hidden md:inline-flex items-center gap-1 rounded-full border border-ink/20 px-3.5 py-1.5 text-[12px] font-medium text-ink/80 transition-all hover:border-ink/40 hover:text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              My CV
            </Link>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1 rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Hire me
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-8 w-8 place-items-center rounded-md text-ink md:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 7h18M3 17h18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-x-0 top-12 z-40 border-b border-ink-200/60 bg-white/95 backdrop-blur md:hidden ${mobileOpen ? '' : 'hidden'
          }`}
      >
        <ul className="container-x flex flex-col py-4 text-lg">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-medium tracking-tight text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/cv"
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-medium tracking-tight text-ink"
            >
              CV
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
