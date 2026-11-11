export type SpecRow = [label: string, value?: string | number | null | false];

export function SpecTable({ rows }: { rows: SpecRow[] }) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && v !== false && v !== '');
  if (filled.length === 0) return null;
  return (
    <dl className="divide-y divide-border/60 rounded-2xl border border-border bg-card">
      {filled.map(([label, value]) => (
        <div key={label} className="grid grid-cols-3 gap-2 px-4 py-3 text-xs sm:text-sm">
          <dt className="text-muted-foreground font-medium">{label}</dt>
          <dd className="col-span-2 font-semibold text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
