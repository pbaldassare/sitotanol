import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Placeholder from '@/components/Placeholder';
import Closing from '@/components/Closing';
import { tight } from '@/components/Tight';
import { getDict, hasLocale, href, locales, pageMeta, products } from '@/lib/i18n';

export const generateStaticParams = () => locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
export const dynamicParams = false;

const find = (slug: string) => products.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<'/[lang]/software/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = find(slug);
  if (!hasLocale(lang) || !p) return {};
  const t = getDict(lang);
  const item = t.products.items[p.slug];
  // shortcut: title and description built from the product line; replace with hand-written copy per language before launch.
  return pageMeta(lang, { title: `${p.name} – ${t.productPage.meta} ${item.sector.toLowerCase()} | TANOL Media`, description: item.line }, 'software', `/${p.slug}`);
}

export default async function ProductPage({ params }: PageProps<'/[lang]/software/[slug]'>) {
  const { lang, slug } = await params;
  const p = find(slug);
  if (!hasLocale(lang) || !p) notFound();
  const t = getDict(lang);
  const item = t.products.items[p.slug];
  const d = t.productDetails[p.slug];
  const L = t.productPage;

  return (
    <>
      <header className="page-head wrap">
        <Link href={href(lang, 'software')} className="link back">
          <ArrowLeft aria-hidden size={16} /> {L.back}
        </Link>
        <h1 className="display">{p.name}</h1>
        <p className="catalog-sector sector-lg">{item.sector}</p>
        <p className="lead lead-lg">{tight(item.line)}</p>
        <div className="actions">
          <Link href={`${href(lang, 'contact')}?software=${p.slug}`} className="btn btn-ink">
            {L.demo} <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
        <div className="ph-row">
          <Placeholder tag={t.placeholder} label={L.linkPlaceholder} />
          {'app' in p && <Placeholder tag={t.placeholder} label={`${L.store}: ${L.storePlaceholder}`} />}
        </div>
      </header>

      <section className="wrap product-body" aria-label={p.name}>
        <div className="frame frame-wide" data-reveal>
          <div className="frame-bar" aria-hidden><span /><span /><span /></div>
          <Placeholder tag={t.placeholder} label={`${L.screensPlaceholder} ${p.name}`} className="frame-ph frame-ph-tall" />
        </div>

        <div className="facts">
          <div data-reveal>
            <h2>{L.problem}</h2>
            <p>{d.problem}</p>
          </div>
          <div data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <h2>{L.how}</h2>
            <ul className="checks">
              {d.features.map((f) => <li key={f}><Check aria-hidden size={18} /> {f}</li>)}
            </ul>
          </div>
          <div data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <h2>{L.forWho}</h2>
            <p>{d.forWho}</p>
          </div>
        </div>
        <p className="custom-note">{L.custom}</p>
      </section>

      <Closing lang={lang} />
    </>
  );
}
