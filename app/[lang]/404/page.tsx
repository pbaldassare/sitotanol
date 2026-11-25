import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NotFoundView from '@/components/NotFoundView';
import { getDict, hasLocale } from '@/lib/i18n';

// Exported as /<lang>/404.html: Cloudflare Pages serves the closest 404.html for unknown paths under each language.
export async function generateMetadata({ params }: PageProps<'/[lang]/404'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: `${getDict(lang).notFound.title} | TANOL Media`, robots: { index: false } } : {};
}

export default async function NotFoundPage({ params }: PageProps<'/[lang]/404'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <NotFoundView lang={lang} />;
}
