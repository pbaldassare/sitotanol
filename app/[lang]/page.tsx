import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, LayoutGrid, Megaphone, Sparkles } from 'lucide-react';
import Placeholder from '@/components/Placeholder';
import Perimeter from '@/components/Perimeter';
import Registry from '@/components/Registry';
import Closing from '@/components/Closing';
import { tight } from '@/components/Tight';
import { getDict, hasLocale, href, pageMeta, products } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMeta(lang, getDict(lang).meta) : {};
}

const i = (n: number) => ({ '--i': n }) as CSSProperties;
const pillarIcons = [LayoutGrid, Sparkles, Megaphone];

const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TANOL Media SE',
  legalName: 'TANOL Media SE',
  taxID: '14247283',
  foundingDate: '2022-02-11',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Revoluční 1082/8',
    postalCode: '110 00',
    addressLocality: 'Praha 1',
    addressCountry: 'CZ',
  },
};

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />

      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" className="display">{tight(t.hero.title)}</h1>
          <p className="hero-sub">{t.hero.subtitle}</p>
          <div className="actions">
            <Link href={href(lang, 'contact')} className="btn btn-action">
              {t.cta.primary} <ArrowRight aria-hidden size={18} />
            </Link>
            <Link href={href(lang, 'software')} className="btn btn-ghost">{t.cta.secondary}</Link>
          </div>
        </div>

        <nav className="index" aria-labelledby="index-title">
          <div className="index-head">
            <h2 id="index-title">{t.hero.indexCaption}</h2>
            <Link href={href(lang, 'software')} className="link">
              {t.hero.indexAll} <ArrowUpRight aria-hidden size={16} />
            </Link>
          </div>
          <ol>
            {products.map((p, n) => (
              <li key={p.slug} data-reveal style={i(n)}>
                <Link href={href(lang, 'software', `/${p.slug}`)}>
                  <span className="index-name">{p.name}</span>
                  <span className="index-sector">{t.products.items[p.slug].sector}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <ul className="pillars">
          {t.pillars.map((p, n) => {
            const Icon = pillarIcons[n];
            return (
              <li key={p.title}>
                <Icon aria-hidden size={20} className="pillar-icon" />
                <h2>{p.title}</h2>
                <p>{p.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="ai" aria-labelledby="ai-title">
        <div className="wrap">
          <div className="ai-head" data-reveal>
            <h2 id="ai-title" className="h-section">{tight(t.ai.title)}</h2>
            <p className="lead">{t.ai.lead}</p>
          </div>

          <Perimeter ai={t.ai} />

          <div className="offers">
            {t.ai.offers.map((o, n) => (
              <div key={o.title} className="offer" data-reveal style={i(n)}>
                <h3>{o.title}</h3>
                <ul>
                  {o.points.map((p) => <li key={p}><Check aria-hidden size={18} /> {p}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="steps" data-reveal>
            <h3>{t.ai.stepsTitle}</h3>
            <ol>{t.ai.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>

          <div className="actions">
            <Link href={href(lang, 'contact')} className="btn btn-action">
              {t.cta.primary} <ArrowRight aria-hidden size={18} />
            </Link>
            <Link href={href(lang, 'ai')} className="link link-light">
              {t.ai.more} <ArrowRight aria-hidden size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="products wrap" aria-labelledby="products-title">
        <div className="products-head" data-reveal>
          <div>
            <h2 id="products-title" className="h-section">{tight(t.products.title)}</h2>
            <p className="lead">{t.products.lead}</p>
          </div>
          <div className="frame">
            <div className="frame-bar" aria-hidden><span /><span /><span /></div>
            <Placeholder tag={t.placeholder} label={t.products.screensPlaceholder} className="frame-ph" />
          </div>
        </div>
        <ul className="catalog">
          {products.map((p, n) => {
            const item = t.products.items[p.slug];
            return (
              <li key={p.slug} data-reveal style={i(n % 3)}>
                <h3>{p.name}</h3>
                <p className="catalog-sector">{item.sector}</p>
                <p>{item.line}</p>
                <Link href={href(lang, 'software', `/${p.slug}`)} className="link" aria-label={`${t.products.open}: ${p.name}`}>
                  {t.products.open} <ArrowRight aria-hidden size={16} />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="trust" aria-labelledby="trust-title">
        <div className="wrap trust-grid">
          <div data-reveal>
            <h2 id="trust-title" className="h-section">{tight(t.trust.title)}</h2>
            <p className="lead">{t.trust.lead}</p>
            <div className="commitments">
              {t.trust.commitments.map((c) => (
                <div key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
          <Registry rows={t.trust.company} />
          <Placeholder tag={t.placeholder} label={t.trust.casesPlaceholder} className="cases-ph" />
        </div>
      </section>

      <Closing lang={lang} />
    </>
  );
}
