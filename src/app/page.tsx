import { ExperienceCard } from "@/components/experience-card";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.25),transparent_70%)] blur-2xl" />
          <div className="absolute right-10 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.18),transparent_70%)] blur-2xl" />
        </div>

        <header className="relative z-10">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pb-6 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-display text-4xl font-semibold text-fg sm:text-5xl">
                Cayvon Morady
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">
                2026 Resume
              </p>
              <h1 className="font-display text-3xl font-semibold text-fg sm:text-4xl">
                {resumeData.headline.currentTitle}
              </h1>

              <p className="font-display text-xl font-medium text-fg sm:text-2xl">
                {resumeData.headline.currentCompany}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:flex">
                <a className="transition hover:text-fg" href="#profile">
                  Profile
                </a>
                <a className="transition hover:text-fg" href="#experience">
                  Experience
                </a>
                <a className="transition hover:text-fg" href="#skills">
                  Skills
                </a>
                <a className="transition hover:text-fg" href="#education">
                  Education
                </a>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20">
          <section
            id="profile"
            className="rounded-3xl border border-black/10 bg-card p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Profile
                </span>
              </div>
              <p className="text-lg leading-7 text-muted sm:text-xl">
                {resumeData.summary}
              </p>
            </div>
          </section>

          <Section id="experience" title="Experience" subtitle="Track Record">
            <div className="mt-6 grid gap-6">
              {resumeData.experience.map((item) => (
                <ExperienceCard key={`${item.company}-${item.role}`} item={item} />
              ))}
            </div>
          </Section>

          <Section id="skills" title="Skills" subtitle="Core Strengths">
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {resumeData.skills.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-black/10 bg-card p-5"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                    {group.category}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[color:color-mix(in_oklab,var(--accent)_12%,transparent)] px-3 py-1 text-xs font-semibold text-fg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education" subtitle="Foundation">
            <div className="mt-6 rounded-2xl border border-black/10 bg-card p-6">
              {resumeData.education.map((item) => (
                <div key={item.institution} className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-fg">
                        {item.institution}
                      </h3>
                      <p className="text-sm font-medium text-muted">
                        {item.program}
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {item.date}
                    </span>
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                    {item.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

