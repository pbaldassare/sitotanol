import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';
import { getDict, hasLocale, href, locales } from '@/lib/i18n';
import '../globals.css';

// next/font downloads the files at build time and serves them from this site.
const sans = Plus_Jakarta_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};
export const viewport: Viewport = { themeColor: '#F8FAFC' };

export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const dynamicParams = false;

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <html lang={t.htmlLang} className={sans.variable}>
      <body>
        <Header lang={lang} nav={t.nav} cta={t.cta.primary} />
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-grid">
            <div>
              <p className="wordmark"><b>TANOL</b> Media</p>
              <p className="muted">TANOL Media SE · Revoluční 1082/8, 110 00 Praha 1 · IČO 142 47 283</p>
            </div>
            <ul className="footer-links">
              <li><Link href={href(lang, 'how')}>{t.footer.how}</Link></li>
              <li><Link href={href(lang, 'privacy')}>{t.footer.privacy}</Link></li>
              <li><Link href={href(lang, 'cookies')}>{t.footer.cookies}</Link></li>
              <li><Link href={href(lang, 'legal')}>{t.footer.legal}</Link></li>
            </ul>
            <p className="muted small">© {new Date().getFullYear()} TANOL Media SE. {t.footer.rights}</p>
          </div>
        </footer>
        <Reveal />
      </body>
    </html>
  );
}
