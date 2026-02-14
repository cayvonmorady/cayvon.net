"use client";

import { useId, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { ExperienceItem } from "@/types/resume";

type ExperienceCardProps = {
  item: ExperienceItem;
};

export function ExperienceCard({ item }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const highlightsId = useId();
  const hasExtraHighlights = item.highlights.length > 2;
  const mobileHighlights = isExpanded
    ? item.highlights
    : item.highlights.slice(0, 2);

  return (
    <article className="rounded-2xl border border-black/10 bg-card p-5 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)] sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold break-words text-fg">{item.role}</h3>
          <p className="text-sm font-medium break-words text-muted">{item.company}</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:tracking-[0.2em]">
          {item.start} - {item.end}
        </span>
      </div>

      <ul
        id={highlightsId}
        className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted sm:hidden"
      >
        {mobileHighlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      {hasExtraHighlights ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={highlightsId}
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-card px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-150 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hidden"
        >
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={`h-3 w-3 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      ) : null}

      <ul className="mt-4 hidden list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted sm:flex">
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </article>
  );
}
