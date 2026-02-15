import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="retro-section vaporwave-section scroll-mt-24 py-8 sm:py-10"
    >
      <div className="retro-section__inner vaporwave-section__inner flex flex-col gap-3">
        <div className="retro-section__header vaporwave-section__header">
          <p className="retro-section__eyebrow vaporwave-section__eyebrow text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-muted">
            {`module://${id.toUpperCase()}`}
          </p>
          <h2
            className="retro-section__title vaporwave-glitch-title font-display text-2xl font-semibold leading-tight text-accent sm:text-4xl"
            data-text={title}
          >
            {title}
          </h2>
        </div>
        <div className="retro-section__body">{children}</div>
      </div>
    </section>
  );
}
