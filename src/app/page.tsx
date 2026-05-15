import { ExperienceCard } from "@/components/experience-card";
import { AnchorLink } from "@/components/anchor-link";
import { RetroDesktopShell } from "@/components/retro-desktop/retro-desktop-shell";
import { Section } from "@/components/section";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <>
      <RetroDesktopShell />

      <div id="top" className="modern-layout min-h-screen bg-bg text-fg">
        <div className="relative overflow-hidden">
          <header className="relative z-10">
            <div className="hero-safe-top relative mx-auto w-full max-w-5xl px-6 pb-6">
              <div className="relative z-10">
                <div className="flex items-center justify-end pb-3">
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

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="font-display text-4xl font-semibold text-fg sm:text-5xl">
                      Cayvon Morady
                    </p>
                    <h1 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
                      {resumeData.headline.currentTitle}
                    </h1>
                    <p className="font-display text-xl font-medium text-fg sm:text-2xl">
                      {resumeData.headline.currentCompany}
                    </p>
                  </div>

                  <nav className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:flex">
                    <AnchorLink className="transition hover:text-fg" targetId="top">
                      Profile
                    </AnchorLink>
                    <AnchorLink className="transition hover:text-fg" targetId="experience">
                      Experience
                    </AnchorLink>
                    <AnchorLink className="transition hover:text-fg" targetId="skills">
                      Skills
                    </AnchorLink>
                    <AnchorLink className="transition hover:text-fg" targetId="education">
                      Education
                    </AnchorLink>
                  </nav>
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20">
            <div className="retro-utility-strip hidden text-xs font-medium text-fg">
              <AnchorLink targetId="top">Home</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">|</span>
              <AnchorLink targetId="experience">Experience</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">|</span>
              <AnchorLink targetId="skills">Skills</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">|</span>
              <AnchorLink targetId="education">Education</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">|</span>
              <a href="https://linkedin.com/in/morady" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>

            <section
              id="profile"
              className="retro-panel rounded-3xl border border-black/10 bg-card p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
            >
              <p className="text-lg leading-7 text-muted sm:text-xl">{resumeData.summary}</p>
            </section>

            <Section id="experience" title="Experience">
              <div className="mt-6 grid gap-6">
                {resumeData.experience.map((item) => (
                  <ExperienceCard key={`${item.company}-${item.role}`} item={item} />
                ))}
              </div>
            </Section>

            <Section id="skills" title="Skills">
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
                          className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold text-fg"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="education" title="Education">
              <div className="retro-panel mt-6 rounded-2xl border border-black/10 bg-card p-6">
                {resumeData.education.map((item) => (
                  <div key={item.institution} className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-fg">{item.institution}</h3>
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
              Last updated: February 2026 | Visitor: 273623
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
