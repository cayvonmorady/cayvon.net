import type { ExperienceItem } from "@/types/resume";

type ExperienceCardProps = {
  item: ExperienceItem;
};

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-card p-6 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-fg">{item.role}</h3>
          <p className="text-sm font-medium text-muted">{item.company}</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          {item.start} - {item.end}
        </span>
      </div>
      <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted">
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  );
}