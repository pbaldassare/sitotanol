import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHead from '@/components/PageHead';
import Placeholder from '@/components/Placeholder';
import SoftwareCatalog from '@/components/SoftwareCatalog';
import Closing from '@/components/Closing';
import { getDict, hasLocale, href, pageMeta, products } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/software'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMeta(lang, getDict(lang).softwarePage.meta, 'software') : {};
}

export default async function SoftwarePage({ params }: PageProps<'/[lang]/software'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const items = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    ...t.products.items[p.slug],
    href: href(lang, 'software', `/${p.slug}`),
  }));

  return (
    <>
      <PageHead title={t.products.title} lead={t.products.lead} />
      <section className="wrap section-tight" aria-label={t.nav.software}>
        <SoftwareCatalog items={items} labels={{ filter: t.softwarePage.filterLabel, all: t.softwarePage.all, shown: t.softwarePage.shown, open: t.products.open }} />
        <Placeholder tag={t.placeholder} label={t.products.screensPlaceholder} className="block-ph" />
      </section>
      <Closing lang={lang} />
    </>
  );
}
