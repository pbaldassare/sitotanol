'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { href, locales, switchPath, type Locale } from '@/lib/i18n';
import type { Dict } from '@/content/it';

const navKeys = ['software', 'ai', 'communication', 'about', 'contact'] as const;

export default function Header({ lang, nav, cta }: { lang: Locale; nav: Dict['nav']; cta: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const langSwitch = (
    <ul className="lang" aria-label={nav.language}>
      {locales.map((l) => (
        <li key={l}>
          <Link href={switchPath(path, l)} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined}>
            {l.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="site-header" data-open={open || undefined}>
      <a className="skip" href="#main">{nav.skip}</a>
      <div className="wrap header-row">
        <Link href={href(lang)} className="wordmark" aria-label={nav.home}>
          <b>TANOL</b> Media
        </Link>
        <nav id="site-nav" className="site-nav" aria-label="Menu">
          <ul>
            {navKeys.map((k) => {
              const to = href(lang, k);
              return (
                <li key={k}>
                  <Link href={to} aria-current={path.startsWith(to) ? 'page' : undefined}>{nav[k]}</Link>
                </li>
              );
            })}
          </ul>
          {langSwitch}
        </nav>
        <Link href={href(lang, 'contact')} className="btn btn-action btn-sm">{cta}</Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          <span className="sr-only">{open ? nav.close : nav.menu}</span>
        </button>
      </div>
    </header>
  );
}
