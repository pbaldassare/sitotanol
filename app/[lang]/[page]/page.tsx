import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, Check, LayoutGrid, Mail, MapPin, Megaphone, Sparkles } from 'lucide-react';
import PageHead from '@/components/PageHead';
import Placeholder from '@/components/Placeholder';
import Perimeter from '@/components/Perimeter';
import Registry from '@/components/Registry';
import Closing from '@/components/Closing';
import ContactForm from '@/components/ContactForm';
import { tight } from '@/components/Tight';
import { getDict, hasLocale, href, locales, pageMeta, type Locale, type RouteKey } from '@/lib/i18n';
import type { Dict } from '@/content/it';

// Every localized page except Home and Software lives here, keyed by its route-table entry.
const pages = ['ai', 'communication', 'how', 'about', 'contact', 'privacy', 'cookies', 'legal'] as const;
type PageKey = (typeof pages)[number];

const metaOf = (t: Dict, k: PageKey) =>
  ({
    ai: t.aiPage.meta, communication: t.communicationPage.meta, how: t.howPage.meta, about: t.aboutPage.meta,
    contact: t.contactPage.meta, privacy: t.privacyPage.meta, cookies: t.cookiePage.meta, legal: t.legalPage.meta,
  })[k];

const resolve = (lang: string, seg: string) => {
  if (!hasLocale(lang)) return null;
  const t = getDict(lang);
  const key = pages.find((k) => t.routes[k as RouteKey] === seg);
  return key ? { lang, t, key } : null;
};

export const generateStaticParams = () => locales.flatMap((lang) => pages.map((k) => ({ lang, page: getDict(lang).routes[k] })));
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/[lang]/[page]'>): Promise<Metadata> {
  const { lang, page } = await params;
  const r = resolve(lang, page);
  return r ? pageMeta(r.lang, metaOf(r.t, r.key), r.key) : {};
}

const i = (n: number) => ({ '--i': n }) as CSSProperties;

export default async function Page({ params }: PageProps<'/[lang]/[page]'>) {
  const { lang, page } = await params;
  const r = resolve(lang, page);
  if (!r) notFound();
  const { t, key } = r;

  switch (key) {
    case 'ai': return <AiPage lang={r.lang} t={t} />;
    case 'communication': return <CommunicationPage lang={r.lang} t={t} />;
    case 'how': return <HowPage lang={r.lang} t={t} />;
    case 'about': return <AboutPage lang={r.lang} t={t} />;
    case 'contact': return <ContactPage lang={r.lang} t={t} />;
    case 'privacy': return <TextPage t={t} title={t.privacyPage.title} sections={t.privacyPage.sections} />;
    case 'cookies': return <TextPage t={t} title={t.cookiePage.title} sections={t.cookiePage.sections} />;
    case 'legal': return (
      <>
        <PageHead title={t.legalPage.title} lead={t.legalPage.lead} />
        <section className="wrap section-tight narrow"><Registry rows={t.trust.company} /></section>
      </>
    );
  }
}

type P = { lang: Locale; t: Dict };

function AiPage({ lang, t }: P) {
  const a = t.aiPage;
  return (
    <>
      <PageHead title={a.title} lead={`${t.ai.title} ${t.ai.lead}`}>
        <div className="actions">
          <Link href={href(lang, 'contact')} className="btn btn-action">{t.cta.primary} <ArrowRight aria-hidden size={18} /></Link>
        </div>
      </PageHead>

      <section className="ai ai-page" aria-labelledby="inhouse-title">
        <div className="wrap">
          <div className="split">
            <div data-reveal>
              <h2 id="inhouse-title" className="h-section">{tight(a.inhouse.title)}</h2>
              <p className="lead">{a.inhouse.text}</p>
            </div>
            <ul className="checks checks-light" data-reveal style={i(1)}>
              {a.inhouse.points.map((p) => <li key={p}><Check aria-hidden size={18} /> {p}</li>)}
            </ul>
          </div>
          <Perimeter ai={t.ai} />
          <div className="sectors" data-reveal>
            <h3>{a.inhouse.forWho}</h3>
            <ul>{a.inhouse.sectors.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="training-title">
        <div className="split">
          <div data-reveal>
            <h2 id="training-title" className="h-section">{tight(a.training.title)}</h2>
            <p className="lead">{a.training.text}</p>
          </div>
          <div data-reveal style={i(1)}>
            <h3 className="h-small">{a.training.formatsTitle}</h3>
            <ul className="rule-list">{a.training.formats.map((f) => <li key={f}>{f}</li>)}</ul>
            <Placeholder tag={t.placeholder} label={a.training.placeholder} className="block-ph" />
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="path-title">
        <h2 id="path-title" className="h-section" data-reveal>{a.pathTitle}</h2>
        <ol className="path">
          {a.path.map((s, n) => (
            <li key={s.t} data-reveal style={i(n)}>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="rules-title">
        <div className="split" data-reveal>
          <h2 id="rules-title" className="h-section">{tight(a.rules.title)}</h2>
          <div>
            <p className="lead">{a.rules.text}</p>
            <Placeholder tag={t.placeholder} label={t.legalDraft} className="block-ph" />
          </div>
        </div>
      </section>

      <Closing lang={lang} />
    </>
  );
}

function CommunicationPage({ lang, t }: P) {
  const c = t.communicationPage;
  return (
    <>
      <PageHead title={c.title} lead={c.lead} />
      <section className="wrap section-tight" aria-label={c.title}>
        <ul className="services">
          {c.services.map((s, n) => (
            <li key={s.t} data-reveal style={i(n % 2)}>
              <h2>{s.t}</h2>
              <p>{s.d}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="wrap section" aria-labelledby="cases-title">
        <h2 id="cases-title" className="h-section" data-reveal>{c.casesTitle}</h2>
        <Placeholder tag={t.placeholder} label={c.casesPlaceholder} className="block-ph block-ph-tall" />
      </section>
      <Closing lang={lang} />
    </>
  );
}

function HowPage({ lang, t }: P) {
  const h = t.howPage;
  return (
    <>
      <PageHead title={h.title} lead={h.lead} />
      <section className="wrap section-tight" aria-label={h.title}>
        <ol className="path path-big">
          {h.steps.map((s, n) => (
            <li key={s.t} data-reveal style={i(n)}>
              <h2>{s.t}</h2>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>
      <Closing lang={lang} />
    </>
  );
}

function AboutPage({ lang, t }: P) {
  const a = t.aboutPage;
  return (
    <>
      <PageHead title={a.title} lead={a.lead} />
      <section className="wrap section-tight" aria-label={a.title}>
        <ul className="pillars pillars-page">
          {t.pillars.map((p, n) => {
            const Icon = [LayoutGrid, Sparkles, Megaphone][n];
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
      <section className="wrap section split" aria-labelledby="team-title">
        <div data-reveal>
          <h2 id="team-title" className="h-section">{a.teamTitle}</h2>
          <Placeholder tag={t.placeholder} label={a.teamPlaceholder} className="block-ph block-ph-tall" />
        </div>
        <div data-reveal style={i(1)}>
          <h2 className="h-small">{a.dataTitle}</h2>
          <Registry rows={t.trust.company} />
        </div>
      </section>
      <Closing lang={lang} />
    </>
  );
}

function ContactPage({ lang, t }: P) {
  const c = t.contactPage;
  return (
    <>
      <PageHead title={c.title} lead={c.lead} />
      <section className="wrap section-tight contact-grid">
        <div className="contact-form">
          <h2 className="h-small">{c.form.title}</h2>
          <ContactForm f={c.form} lang={lang} privacyHref={href(lang, 'privacy')} />
        </div>
        <aside className="contact-side">
          <div>
            <h2 className="h-small"><CalendarDays aria-hidden size={18} /> {c.bookTitle}</h2>
            <Placeholder tag={t.placeholder} label={c.calendarPlaceholder} className="block-ph block-ph-tall" />
          </div>
          <div>
            <h2 className="h-small"><Mail aria-hidden size={18} /> {c.emailTitle}</h2>
            <Placeholder tag={t.placeholder} label={c.emailPlaceholder} />
          </div>
          <div>
            <h2 className="h-small"><MapPin aria-hidden size={18} /> {c.officeTitle}</h2>
            <address>TANOL Media SE<br />Revoluční 1082/8<br />110 00 Praha 1</address>
          </div>
        </aside>
      </section>
    </>
  );
}

function TextPage({ t, title, sections }: { t: Dict; title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHead title={title} />
      <section className="wrap section-tight narrow prose">
        <Placeholder tag={t.placeholder} label={t.legalDraft} />
        {sections.map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
