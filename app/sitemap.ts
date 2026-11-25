import type { MetadataRoute } from 'next';
import { href, locales, products, type RouteKey } from '@/lib/i18n';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const keys: (RouteKey | undefined)[] = [undefined, 'software', 'ai', 'communication', 'how', 'about', 'contact', 'privacy', 'cookies', 'legal'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (key?: RouteKey, rest = '') => ({
    url: base + href('it', key, rest),
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, base + href(l, key, rest)])) },
  });
  // One entry per page; the hreflang alternates list the other two languages.
  return [...keys.map((k) => entry(k)), ...products.map((p) => entry('software', `/${p.slug}`))];
}
