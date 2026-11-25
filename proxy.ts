import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, hasLocale } from '@/lib/i18n';

const COOKIE = 'lang';

// Browser language decides only on the first visit; afterwards the last language visited wins.
export function proxy(req: NextRequest) {
  const seg = req.nextUrl.pathname.split('/')[1];
  if (hasLocale(seg)) {
    const res = NextResponse.next();
    if (req.cookies.get(COOKIE)?.value !== seg)
      res.cookies.set(COOKIE, seg, { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', path: '/' });
    return res;
  }
  const saved = req.cookies.get(COOKIE)?.value;
  const accepted = (req.headers.get('accept-language') ?? '')
    .split(',')
    .map((p) => p.split(';')[0].trim().slice(0, 2).toLowerCase());
  const lang = saved && hasLocale(saved) ? saved : (accepted.find(hasLocale) ?? defaultLocale);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
};
