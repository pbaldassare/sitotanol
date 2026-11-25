'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, getDict, hasLocale } from '@/lib/i18n';
import { tight } from '@/components/Tight';

export default function NotFound() {
  const seg = usePathname().split('/')[1];
  const lang = hasLocale(seg) ? seg : defaultLocale;
  const t = getDict(lang);
  return (
    <section className="page-head wrap notfound">
      <h1 className="display">{tight(t.notFound.title)}</h1>
      <p className="lead lead-lg">{t.notFound.text}</p>
      <div className="actions">
        <Link href={`/${lang}`} className="btn btn-ink">{t.notFound.back}</Link>
      </div>
    </section>
  );
}
