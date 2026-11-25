// Plus Jakarta's heavy full stop carries a wide side bearing; pull it back against the word at display sizes.
export const tight = (s: string) =>
  s.split(/(?<=\S)([.,])(?=\s|$)/).map((part, n) => (n % 2 ? <span key={n} className="punct">{part}</span> : part));
