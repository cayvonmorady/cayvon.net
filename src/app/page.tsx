import { ExperienceCard } from "@/components/experience-card";
import { RetroDesktopShell } from "@/components/retro-desktop/retro-desktop-shell";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <>
      <RetroDesktopShell />

      <div className="modern-layout min-h-screen bg-bg text-fg">
        <div className="relative overflow-hidden">
          <div className="retro-bloom-overlay pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--bloom-accent),transparent_72%)] opacity-80 blur-2xl sm:-left-24 sm:top-2 sm:h-[22rem] sm:w-[22rem] sm:opacity-90 sm:blur-3xl xl:-left-14 xl:top-8 xl:h-[26rem] xl:w-[26rem]" />
            <div className="absolute -right-20 top-[62%] h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--bloom-neutral),transparent_72%)] opacity-70 blur-2xl sm:-right-20 sm:top-[56%] sm:h-[20rem] sm:w-[20rem] sm:opacity-85 sm:blur-3xl xl:-right-10 xl:top-[58%] xl:h-[24rem] xl:w-[24rem]" />
          </div>

          <header className="relative z-10">
            <div className="mx-auto w-full max-w-5xl px-6 pb-6 pt-10">
              <div className="flex justify-end pb-3">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <a
                    href="https://linkedin.com/in/morady"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Cayvon Morady on LinkedIn"
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-black/10 bg-card p-1.5 text-muted transition-colors duration-150 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current sm:h-5 sm:w-5"
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.09V21h-4v-5.59c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94V21h-4V9Z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20">
            <div className="retro-utility-strip hidden text-xs font-medium text-fg">
              <a href="#profile">Home</a>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <a href="#experience">Experience</a>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <a href="#skills">Skills</a>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <a href="#education">Education</a>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <a
                href="https://linkedin.com/in/morady"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>

            <section
              id="profile"
              className="retro-panel rounded-3xl border border-black/10 bg-card p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
            >
              <div className="flex flex-col gap-6">
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
                    className="retro-panel rounded-2xl border border-black/10 bg-card p-5"
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
              <div className="retro-panel mt-6 rounded-2xl border border-black/10 bg-card p-6">
                {resumeData.education.map((item) => (
                  <div key={item.institution} className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-fg">
                          {item.institution}
                        </h3>
                        <p className="text-sm font-medium text-muted">{item.program}</p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        {item.date}
                      </span>
                    </div>
                    <ul className="list-disc space-y-2 pl-5 text-base leading-6 text-muted">
                      {item.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <p className="retro-status-line mt-8 hidden text-xs text-muted">
              Last updated: February 2026 | Best viewed at 1024 x 768 | Visitor:
              000042
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
