import { ArrowRight, Database, FileText, ListChecks, ShieldCheck } from 'lucide-react';
import type { Dict } from '@/content/it';

const sourceIcons = [FileText, Database, ListChecks];

// The "your company" boundary: sources, question and cited answer all stay inside the dashed line.
export default function Perimeter({ ai }: { ai: Dict['ai'] }) {
  return (
    <figure className="perimeter" data-reveal>
      <figcaption className="perimeter-label">
        <ShieldCheck aria-hidden size={16} /> {ai.boundary}
      </figcaption>
      <div className="perimeter-body">
        <div className="sources">
          <p className="sources-label">{ai.sourcesLabel}</p>
          <ul>
            {ai.sources.map((s, n) => {
              const Icon = sourceIcons[n];
              return <li key={s}><Icon aria-hidden size={18} /> {s}</li>;
            })}
          </ul>
        </div>
        <div className="flow" aria-hidden>
          <ArrowRight size={20} />
        </div>
        <div className="chat">
          <p className="chat-tag">{ai.exampleLabel}</p>
          <p className="bubble bubble-q">{ai.question}</p>
          <div className="bubble bubble-a">
            <p>{ai.answer}</p>
            <p className="cite"><FileText aria-hidden size={14} /> {ai.citation}</p>
          </div>
        </div>
      </div>
      <p className="perimeter-out">{ai.outside}</p>
    </figure>
  );
}
