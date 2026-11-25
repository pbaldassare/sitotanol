import type { Dict } from '@/content/it';

export default function Registry({ rows, className = '' }: { rows: Dict['trust']['company']; className?: string }) {
  return (
    <dl className={`registry ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
