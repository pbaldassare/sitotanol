import { PencilLine } from 'lucide-react';

// Marks content the brief leaves open; must never ship to production.
export default function Placeholder({ tag, label, className = '' }: { tag: string; label: string; className?: string }) {
  return (
    <div className={`ph ${className}`} role="note">
      <span className="ph-tag">
        <PencilLine aria-hidden size={14} /> {tag}
      </span>
      <span className="ph-label">{label}</span>
    </div>
  );
}
