import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {subtitle ?? "Section"}
          </p>
          <h2 className="font-display text-3xl font-semibold text-fg sm:text-4xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}