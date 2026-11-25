import type { Metadata } from 'next';
import it, { type Dict } from '@/content/it';
import en from '@/content/en';
import cs from '@/content/cs';

export const locales = ['it', 'en', 'cs'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'it';

const dicts: Record<Locale, Dict> = { it, en, cs };

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);
export const getDict = (l: Locale) => dicts[l];

export type RouteKey = keyof Dict['routes'];
export const href = (l: Locale, key?: RouteKey, rest = '') =>
  `/${l}${key ? `/${dicts[l].routes[key]}` : ''}${rest}`;

// Translate a path to another locale by mapping its first segment through the route tables.
export function switchPath(path: string, to: Locale) {
  const [, from, seg, ...rest] = path.split('/');
  if (!hasLocale(from) || !seg) return `/${to}`;
  const key = (Object.keys(dicts[from].routes) as RouteKey[]).find((k) => dicts[from].routes[k] === seg);
  return key ? [href(to, key), ...rest].join('/') : `/${to}`;
}

export const products = [
  { app: true, slug: 'sofabis', name: 'Sofabis' },
  { slug: 'rca-dealer', name: 'RCA Dealer' },
  { slug: 'pronto', name: 'Pronto' },
  { slug: 'wapy', name: 'Wapy' },
  { slug: 'paytomorrow', name: 'Paytomorrow' },
  { slug: 'univolt', name: 'Univolt' },
  { app: true, slug: 'cibarius', name: 'Cibarius' },
  { slug: 'allenati', name: 'Allenati' },
  { app: true, slug: 'idguard', name: 'IDGuard' },
] as const satisfies readonly { slug: string; name: string; app?: boolean }[];
export type ProductSlug = (typeof products)[number]['slug'];

// Per-page metadata with hreflang alternates pointing at the same page in every language.
export function pageMeta(l: Locale, m: { title: string; description: string }, key?: RouteKey, rest = ''): Metadata {
  const url = href(l, key, rest);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(locales.map((x) => [x, href(x, key, rest)])), 'x-default': href(defaultLocale, key, rest) },
    },
    openGraph: { title: m.title, description: m.description, url, siteName: 'TANOL Media', locale: l, type: 'website' },
  };
}
