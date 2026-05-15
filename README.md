# cayvon.net

Personal resume site built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Architecture

The site has two rendering modes toggled at runtime via `RetroModeProvider`:

- **Default** — a standard resume layout (`src/app/page.tsx`) with data-driven sections pulled from `src/data/resume.ts`
- **Retro Desktop** — a fully interactive Windows 9x-style desktop shell rendered in the same page

The retro mode is the more complex surface; the standard mode is intentionally thin.

## Key engineering pieces

### Window manager (`src/components/retro-desktop/use-window-manager.ts`)

Custom hook that owns all window state. Notable design decisions:

- **z-index via monotonic counter** — `zCounterRef` increments on every focus rather than reordering an array, so z-index is always correct without sorting
- **Ref-based constraints** — viewport bounds and taskbar height are kept in a `constraintsRef` so pointer-move handlers always read current values without being re-created on resize
- **Clamp on every mutation** — `clampWindow` enforces workspace bounds and a `MIN_VISIBLE_TITLEBAR_PX` guarantee on every state write (open, drag, resize, maximize, viewport resize), keeping windows recoverable rather than escapable
- **Restore rects** — pre-maximize geometry is stashed in a ref so unmaximize is an exact restore
- **Reference-stable callbacks** — all returned functions are wrapped in `useCallback`; `windowList` and `taskbarWindows` are memoized so downstream components only re-render when window state actually changes

### Sound engine (`src/components/retro-desktop/sound.ts`)

Synthesized retro sounds using the Web Audio API — no audio files. `AudioContext` is lazy-initialized on first user gesture to satisfy browser autoplay policy. Each sound event (`click`, `open`, `close`, `error`) is a short composition of `OscillatorNode` tones scheduled via `AudioContext.currentTime` offsets.

### Drag implementation

Drag state is not kept in React state — it captures pointer origin at `pointerdown`, then `pointermove` handlers compute deltas from that origin and call `setWindows` directly. This avoids stale-closure issues on position and keeps the hot path outside React's event system.

### Theme system

Two independent concerns composed together:

- **Light/dark** — `next-themes` with `ThemeProvider` in `src/app/providers.tsx`
- **Retro mode** — `RetroModeProvider` wraps `ThemeProvider` and injects `retro-desktop.css` on activation

CSS is Tailwind v4 with design tokens defined as custom properties in `globals.css`.

### Data / types

All resume content lives in `src/data/resume.ts` and is typed against `src/types/resume.ts`. The page components are pure presentational — no fetching, no state.

## Project structure

```
src/
  app/
    page.tsx               # default layout (composes section components)
    layout.tsx             # metadata, font loading
    providers.tsx          # ThemeProvider setup
    globals.css            # design tokens and global styles
    retro-desktop.css      # 98.css overrides and retro-mode-specific styles
  components/
    retro-desktop/
      use-window-manager.ts   # all window state and drag logic
      retro-desktop-shell.tsx # desktop canvas, icon grid, window rendering
      taskbar.tsx             # taskbar and start-menu area
      context-menu.tsx        # right-click desktop menu
      boot-splash.tsx         # boot animation sequence
      sound.ts                # Web Audio synthesizer
      types.ts                # WindowState, DesktopWindowId, etc.
      controls/               # beveled buttons, dialogs, progress bars, etc.
    retro-mode-provider.tsx   # toggles retro mode globally
    experience-card.tsx       # expand/collapse card for the default layout
    anchor-link.tsx           # smooth-scroll anchor wrapper
    theme-toggle.tsx          # light/dark switcher
  data/resume.ts              # all resume content
  types/resume.ts             # TypeScript types for resume data
```

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + 98.css |
| Theming | next-themes |
| Audio | Web Audio API (no asset files) |
| Deploy | Vercel |

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # ESLint
```
