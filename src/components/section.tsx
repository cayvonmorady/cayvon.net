import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="retro-section scroll-mt-24 py-8 sm:py-10">
      <div className="retro-section__inner flex flex-col gap-3">
        <div className="retro-section__header">
          <h2 className="retro-section__title font-display text-2xl font-semibold leading-tight text-accent sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="retro-section__body">{children}</div>
      </div>
    </section>
  );
}
