'use client';

import { usePathname } from 'next/navigation';
import NotFoundView from '@/components/NotFoundView';
import { defaultLocale, hasLocale } from '@/lib/i18n';

export default function NotFound() {
  const seg = usePathname().split('/')[1];
  return <NotFoundView lang={hasLocale(seg) ? seg : defaultLocale} />;
}
