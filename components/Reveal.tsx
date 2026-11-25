'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Content is visible without JS; only once this runs do [data-reveal] blocks wait for the viewport.
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
    document.documentElement.classList.add('reveal-on');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
