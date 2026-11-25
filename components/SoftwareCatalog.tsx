'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type Item = { slug: string; name: string; sector: string; line: string; href: string };

export default function SoftwareCatalog({ items, labels }: { items: Item[]; labels: { filter: string; all: string; shown: string; open: string } }) {
  const [sector, setSector] = useState<string | null>(null);
  const shown = sector ? items.filter((p) => p.sector === sector) : items;

  return (
    <>
      <div className="filters" role="group" aria-label={labels.filter}>
        {[null, ...items.map((p) => p.sector)].map((s) => (
          <button key={s ?? 'all'} type="button" className="chip" aria-pressed={sector === s} onClick={() => setSector(s)}>
            {s ?? labels.all}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} {labels.shown}</p>
      <ul className="catalog catalog-page">
        {shown.map((p) => (
          <li key={p.slug}>
            <h2>{p.name}</h2>
            <p className="catalog-sector">{p.sector}</p>
            <p>{p.line}</p>
            <Link href={p.href} className="link" aria-label={`${labels.open}: ${p.name}`}>
              {labels.open} <ArrowRight aria-hidden size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
