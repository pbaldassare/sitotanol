import type { ReactNode } from 'react';
import { tight } from './Tight';

export default function PageHead({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="page-head wrap">
      <h1 className="display">{tight(title)}</h1>
      {lead && <p className="lead lead-lg">{lead}</p>}
      {children}
    </header>
  );
}
