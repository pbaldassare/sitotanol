// Stock photos (Unsplash licence, sources in static/img-sources.txt), served in two widths. Decorative: alt is empty on purpose.
const dims: Record<string, [number, number]> = {
  team: [1600, 2399], training: [1600, 1067], servers: [1600, 900], planning: [1600, 1067],
  prague: [1600, 2133], call: [1600, 900], studio: [1600, 1067], desk: [1600, 1067],
};

export type PhotoName = keyof typeof dims;

export default function Photo({ name, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', priority = false }: { name: PhotoName; className?: string; sizes?: string; priority?: boolean }) {
  const [w, h] = dims[name];
  return (
    <figure className={`photo ${className}`}>
      <img
        src={`/img/${name}-1600.webp`}
        srcSet={`/img/${name}-800.webp 800w, /img/${name}-1600.webp 1600w`}
        sizes={sizes}
        width={w}
        height={h}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </figure>
  );
}
