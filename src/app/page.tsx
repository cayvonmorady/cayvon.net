import { ExperienceCard } from "@/components/experience-card";
import { AnchorLink } from "@/components/anchor-link";
import { RetroDesktopShell } from "@/components/retro-desktop/retro-desktop-shell";
import { Section } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { VaporwaveBootSplash } from "@/components/vaporwave-boot-splash";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <>
      <RetroDesktopShell />
      <VaporwaveBootSplash />

      <div id="top" className="modern-layout vaporwave-scene min-h-screen bg-bg text-fg">
        <div className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="vaporwave-atmosphere pointer-events-none absolute inset-0"
          >
            <div className="vaporwave-starfield" />
            <div className="vaporwave-horizon-glow" />
            <div className="vaporwave-wireframe" />
            <div className="vaporwave-corridor" />
            <div className="vaporwave-floor-grid" />
            <div className="vaporwave-crt-noise" />
            <div className="vaporwave-float vaporwave-float--statue" />
            <div className="vaporwave-float vaporwave-float--column" />
            <div className="vaporwave-float vaporwave-float--column vaporwave-float--column-right" />
            <div className="vaporwave-float vaporwave-float--statue vaporwave-float--statue-secondary" />
            <div className="vaporwave-float vaporwave-float--orb" />
            <div className="vaporwave-float vaporwave-float--orb vaporwave-float--orb-alt" />
            <div className="vaporwave-float vaporwave-float--gem" />
            <div className="vaporwave-float vaporwave-float--palm vaporwave-float--palm-left" />
            <div className="vaporwave-float vaporwave-float--palm vaporwave-float--palm-right" />
            <div className="vaporwave-sun-disc" />
          </div>

          <header className="relative z-10">
            <div className="relative mx-auto w-full max-w-5xl px-6 pb-6 pt-10">
              <div
                aria-hidden="true"
                className="retro-bloom-overlay pointer-events-none absolute inset-0 z-0"
              >
                <div className="absolute -left-20 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--bloom-accent),transparent_72%)] opacity-80 blur-2xl sm:-left-24 sm:top-2 sm:h-[22rem] sm:w-[22rem] sm:opacity-90 sm:blur-3xl xl:-left-14 xl:top-8 xl:h-[26rem] xl:w-[26rem]" />
                <div className="absolute -right-20 top-[62%] h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--bloom-neutral),transparent_72%)] opacity-70 blur-2xl sm:-right-20 sm:top-[56%] sm:h-[20rem] sm:w-[20rem] sm:opacity-85 sm:blur-3xl xl:-right-10 xl:top-[58%] xl:h-[24rem] xl:w-[24rem]" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                  <p className="vaporwave-japanese-tag text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-muted">
                    {"TOKYO MALL // \u30cd\u30aa\u30f3\u30b5\u30a4\u30f3"}
                  </p>
                  <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <a
                      href="https://linkedin.com/in/morady"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Cayvon Morady on LinkedIn"
                      className="vaporwave-icon-button inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-black/10 bg-card p-1.5 text-muted transition-colors duration-150 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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

                <div className="vaporwave-hud-head flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="vaporwave-name font-display text-4xl font-semibold text-fg sm:text-5xl">
                      Cayvon Morady
                    </p>
                    <p className="vaporwave-subline text-xs font-semibold uppercase tracking-[0.4em] text-muted">
                      2026 Resume
                      <span className="vaporwave-only-label">
                        {" // Neon District Build"}
                      </span>
                    </p>
                    <h1
                      className="vaporwave-glitch-title font-display text-3xl font-semibold text-fg sm:text-4xl"
                      data-text={resumeData.headline.currentTitle}
                    >
                      {resumeData.headline.currentTitle}
                    </h1>
                    <p className="vaporwave-company font-display text-xl font-medium text-fg sm:text-2xl">
                      {resumeData.headline.currentCompany}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <nav className="vaporwave-nav hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:flex">
                      <AnchorLink
                        className="vaporwave-nav-link transition hover:text-fg"
                        targetId="top"
                      >
                        Profile
                      </AnchorLink>
                      <AnchorLink
                        className="vaporwave-nav-link transition hover:text-fg"
                        targetId="experience"
                      >
                        Experience
                      </AnchorLink>
                      <AnchorLink
                        className="vaporwave-nav-link transition hover:text-fg"
                        targetId="skills"
                      >
                        Skills
                      </AnchorLink>
                      <AnchorLink
                        className="vaporwave-nav-link transition hover:text-fg"
                        targetId="education"
                      >
                        Education
                      </AnchorLink>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="vaporwave-main relative z-10 mx-auto w-full max-w-5xl px-6 pb-20">
            <div aria-hidden="true" className="vaporwave-marquee">
              <span>
                VIRTUAL PLAZA // VHS DREAMCORE // AESTHETIC MODE MAX // 90S
                SUNSET LOOP // CHROME GHOSTING // NEON HORIZON
              </span>
            </div>

            <div className="retro-utility-strip hidden text-xs font-medium text-fg">
              <AnchorLink targetId="top">Home</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <AnchorLink targetId="experience">Experience</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <AnchorLink targetId="skills">Skills</AnchorLink>
              <span className="retro-utility-separator" aria-hidden="true">
                |
              </span>
              <AnchorLink targetId="education">Education</AnchorLink>
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
              className="retro-panel vaporwave-panel rounded-3xl border border-black/10 bg-card p-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
            >
              <div className="flex flex-col gap-6">
                <p className="text-lg leading-7 text-muted sm:text-xl">
                  {resumeData.summary}
                </p>
              </div>
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
                    className="retro-panel vaporwave-panel rounded-2xl border border-black/10 bg-card p-5"
                  >
                    <h3
                      className="vaporwave-glitch-title text-sm font-semibold uppercase tracking-[0.2em] text-muted"
                      data-text={group.category}
                    >
                      {group.category}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="vaporwave-pill rounded-full bg-[color:color-mix(in_oklab,var(--accent)_12%,transparent)] px-3 py-1 text-xs font-semibold text-fg"
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
              <div className="retro-panel vaporwave-panel mt-6 rounded-2xl border border-black/10 bg-card p-6">
                {resumeData.education.map((item) => (
                  <div key={item.institution} className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3
                          className="vaporwave-glitch-title text-lg font-semibold text-fg"
                          data-text={item.institution}
                        >
                          {item.institution}
                        </h3>
                        <p className="text-sm font-medium text-muted">{item.program}</p>
                      </div>
                      <span className="vaporwave-pixel-tag text-xs font-semibold uppercase tracking-[0.2em] text-muted">
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

            <p className="retro-status-line vaporwave-status-line mt-8 hidden text-xs text-muted">
              Last updated: February 2026 | Visitor:
              273623
            </p>
          </main>
        </div>
      </div>
    </>
  );
}
