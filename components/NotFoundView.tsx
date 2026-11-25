import Link from 'next/link';
import { getDict, type Locale } from '@/lib/i18n';
import { tight } from './Tight';

export default function NotFoundView({ lang }: { lang: Locale }) {
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
