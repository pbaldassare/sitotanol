import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDict, href, type Locale } from '@/lib/i18n';
import { tight } from './Tight';
import Photo from './Photo';

export default function Closing({ lang, photo = false }: { lang: Locale; photo?: boolean }) {
  const t = getDict(lang);
  return (
    <section className={`close wrap ${photo ? 'close-photo' : ''}`} aria-labelledby="close-title">
      <div data-reveal>
        <h2 id="close-title" className="display display-close">{tight(t.close.title)}</h2>
        <p className="lead">{t.close.text}</p>
        <Link href={href(lang, 'contact')} className="btn btn-action btn-lg">
          {t.cta.primary} <ArrowRight aria-hidden size={20} />
        </Link>
      </div>
      {photo && <Photo name="call" className="photo-close" />}
    </section>
  );
}
