import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-8 sm:py-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent sm:tracking-[0.2em]">
            {subtitle ?? "Section"}
          </p>
          <h2 className="font-display text-2xl font-semibold leading-tight text-fg sm:text-4xl">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

