"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRetroMode } from "@/components/retro-mode-provider";
import { resumeData } from "@/data/resume";
import { BootSplash } from "@/components/retro-desktop/boot-splash";
import { ContextMenu } from "@/components/retro-desktop/context-menu";
import { Taskbar } from "@/components/retro-desktop/taskbar";
import { BeveledButton } from "@/components/retro-desktop/controls/beveled-button";
import { Dialog } from "@/components/retro-desktop/controls/dialog";
import { ProgressBar } from "@/components/retro-desktop/controls/progress-bar";
import { RecessedInput } from "@/components/retro-desktop/controls/recessed-input";
import { RetroCheckbox } from "@/components/retro-desktop/controls/retro-checkbox";
import { RetroSelect } from "@/components/retro-desktop/controls/retro-select";
import { createRetroSoundEngine } from "@/components/retro-desktop/sound";
import type {
  ContextMenuAction,
  DesktopIcon,
  DesktopWindowId,
  WindowState,
} from "@/components/retro-desktop/types";
import { useWindowManager } from "@/components/retro-desktop/use-window-manager";

const BOOT_SESSION_KEY = "retro_boot_seen";
const ICON_LANE_WIDTH_PX = 128;
const TASKBAR_HEIGHT_PX = 38;

const DEFAULT_ICONS: DesktopIcon[] = [
  {
    id: "my-computer",
    label: "My Computer",
    windowId: "explorer",
    iconSrc: "/retro-icons/my-computer.png",
    fallbackIconSrc: "/retro-icons/my-computer.svg",
  },
  {
    id: "my-documents",
    label: "My Documents",
    windowId: "profile",
    iconSrc: "/retro-icons/my-documents.png",
    fallbackIconSrc: "/retro-icons/my-documents.svg",
  },
  {
    id: "internet-explorer",
    label: "Internet Explorer",
    windowId: "experience",
    iconSrc: "/retro-icons/internet-explorer.png",
    fallbackIconSrc: "/retro-icons/internet-explorer.svg",
  },
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    windowId: "education",
    iconSrc: "/retro-icons/recycle-bin.png",
    fallbackIconSrc: "/retro-icons/recycle-bin.svg",
  },
];

type Bounds = {
  width: number;
  height: number;
};

type DesktopWindowProps = {
  state: WindowState;
  onFocus: (id: DesktopWindowId) => void;
  onStartDrag: (id: DesktopWindowId, event: ReactPointerEvent<HTMLElement>) => void;
  onMinimize: (id: DesktopWindowId) => void;
  onToggleMaximize: (id: DesktopWindowId) => void;
  onClose: (id: DesktopWindowId) => void;
  children: React.ReactNode;
};

function DesktopWindow({
  state,
  onFocus,
  onStartDrag,
  onMinimize,
  onToggleMaximize,
  onClose,
  children,
}: DesktopWindowProps) {
  if (!state.isOpen || state.isMinimized) {
    return null;
  }

  return (
    <section
      className="window retro-window"
      style={{
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      }}
      onPointerDown={() => onFocus(state.id)}
    >
      <div
        className={`title-bar ${state.isActive ? "" : "inactive"}`.trim()}
        onPointerDown={(event) => onStartDrag(state.id, event)}
      >
        <div className="title-bar-text">{state.title}</div>
        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMinimize(state.id);
            }}
          />
          <button
            aria-label={state.isMaximized ? "Restore" : "Maximize"}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggleMaximize(state.id);
            }}
          />
          <button
            aria-label="Close"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose(state.id);
            }}
          />
        </div>
      </div>
      <div className="window-body retro-window-body">{children}</div>
    </section>
  );
}

function DesktopIconImage({ icon }: { icon: DesktopIcon }) {
  const sources = useMemo(() => {
    const list: string[] = [];
    if (icon.iconSrc) {
      list.push(icon.iconSrc);
    }
    if (icon.fallbackIconSrc) {
      list.push(icon.fallbackIconSrc);
    }
    return list;
  }, [icon.fallbackIconSrc, icon.iconSrc]);
  const [sourceIndex, setSourceIndex] = useState(0);

  const activeSource = sources[sourceIndex];
  if (!activeSource) {
    return <span className="retro-desktop-icon__glyph" aria-hidden="true" />;
  }

  return (
    <Image
      src={activeSource}
      alt=""
      aria-hidden
      className="retro-desktop-icon__image"
      width={32}
      height={32}
      draggable={false}
      unoptimized
      onError={() => {
        setSourceIndex((prev) => Math.min(prev + 1, sources.length - 1));
      }}
    />
  );
}

export function RetroDesktopShell() {
  const { mode } = useRetroMode();
  const isRetro = mode === "retro";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const explorerScrollRef = useRef<HTMLDivElement | null>(null);
  const soundEngineRef = useRef(createRetroSoundEngine());
  const loadTimeoutRef = useRef<number | null>(null);

  const [bounds, setBounds] = useState<Bounds>({ width: 1200, height: 800 });
  const [bootDismissed, setBootDismissed] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [desktopIcons, setDesktopIcons] = useState(DEFAULT_ICONS);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("section");
  const [showDesktopMenuButton, setShowDesktopMenuButton] = useState(false);
  const effectiveIconLaneWidth = useMemo(
    () => Math.min(ICON_LANE_WIDTH_PX, Math.max(72, Math.floor(bounds.width * 0.2))),
    [bounds.width],
  );

  const {
    windows,
    windowList,
    taskbarWindows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    openAllWindows,
    closeAllWindows,
    startDrag,
    applyBounds,
  } = useWindowManager({
    bounds,
    taskbarHeight: TASKBAR_HEIGHT_PX,
  });

  const playSound = useCallback((event: "click" | "open" | "close" | "error") => {
    soundEngineRef.current.play(event);
  }, []);

  useEffect(() => {
    soundEngineRef.current.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setShowDesktopMenuButton(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!isRetro) {
      return;
    }

    const updateBounds = () => {
      const viewport = window.visualViewport;
      const nextBounds = {
        width: Math.max(320, Math.floor(viewport?.width ?? window.innerWidth)),
        height: Math.max(320, Math.floor(viewport?.height ?? window.innerHeight)),
      };
      setBounds((prev) =>
        prev.width === nextBounds.width && prev.height === nextBounds.height
          ? prev
          : nextBounds,
      );
      applyBounds(nextBounds);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.visualViewport?.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
      window.visualViewport?.removeEventListener("resize", updateBounds);
    };
  }, [applyBounds, isRetro]);

  useEffect(() => {
    if (!windows.loading.isOpen) {
      if (loadTimeoutRef.current !== null) {
        window.clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      return;
    }

    loadTimeoutRef.current = window.setTimeout(() => {
      closeWindow("loading");
      loadTimeoutRef.current = null;
    }, 1100);

    return () => {
      if (loadTimeoutRef.current !== null) {
        window.clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [closeWindow, windows.loading.isOpen]);

  const openWindowWithSound = useCallback(
    (id: DesktopWindowId) => {
      openWindow(id);
      playSound("open");
    },
    [openWindow, playSound],
  );

  const handleWindowTaskClick = useCallback(
    (id: DesktopWindowId) => {
      const win = windows[id];
      if (!win.isOpen || win.isMinimized) {
        openWindowWithSound(id);
        return;
      }

      if (win.isActive) {
        minimizeWindow(id);
        playSound("close");
        return;
      }

      focusWindow(id);
      playSound("click");
    },
    [focusWindow, minimizeWindow, openWindowWithSound, playSound, windows],
  );

  const handleContextAction = useCallback(
    (action: ContextMenuAction) => {
      setContextMenuPosition(null);

      if (action === "refresh") {
        openWindow("loading");
        playSound("click");
        return;
      }

      if (action === "arrange-icons") {
        setDesktopIcons((prev) => [...prev].sort((a, b) => a.label.localeCompare(b.label)));
        playSound("click");
        return;
      }

      if (action === "open-all") {
        openAllWindows(["explorer", "profile", "experience", "skills", "education"]);
        playSound("open");
        return;
      }

      if (action === "close-all") {
        closeAllWindows();
        playSound("close");
        return;
      }

      if (action === "properties") {
        openWindowWithSound("properties");
      }
    },
    [closeAllWindows, openAllWindows, openWindow, openWindowWithSound, playSound],
  );

  const explorerLines = useMemo(() => {
    const rows = [
      "Desktop",
      "My Computer",
      "My Documents",
      "Internet Explorer",
      "Programs",
      "Recycle Bin",
      ...resumeData.skills.flatMap((group) => group.items),
      ...resumeData.education.flatMap((item) => item.notes),
    ];
    const term = searchTerm.trim().toLowerCase();
    return rows.filter((line) => line.toLowerCase().includes(term));
  }, [searchTerm]);

  const closeAndSound = useCallback(
    (id: DesktopWindowId) => {
      closeWindow(id);
      playSound("close");
    },
    [closeWindow, playSound],
  );

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    setBootDismissed(true);
    playSound("click");
  }, [playSound]);

  const shouldShowBoot =
    isRetro &&
    !bootDismissed &&
    typeof window !== "undefined" &&
    sessionStorage.getItem(BOOT_SESSION_KEY) !== "1";

  if (!isRetro) {
    return null;
  }

  return (
    <div
      className={`retro-desktop-root ${crtEnabled ? "is-crt-enabled" : ""}`}
      ref={rootRef}
      style={
        {
          "--retro-icon-lane-width": `${effectiveIconLaneWidth}px`,
          "--retro-taskbar-height": `${TASKBAR_HEIGHT_PX}px`,
        } as CSSProperties
      }
    >
      <div
        className="retro-desktop-workspace"
        ref={desktopRef}
        onContextMenu={(event) => {
          event.preventDefault();
          const rect = desktopRef.current?.getBoundingClientRect();
          if (!rect) {
            return;
          }

          const x = Math.min(event.clientX - rect.left, rect.width - 180);
          const y = Math.min(event.clientY - rect.top, rect.height - 180);
          setContextMenuPosition({
            x: Math.max(8, x),
            y: Math.max(8, y),
          });
        }}
        onClick={() => {
          if (contextMenuPosition) {
            setContextMenuPosition(null);
          }
        }}
      >
        {showDesktopMenuButton ? (
          <BeveledButton
            className="retro-mobile-desktop-menu-btn"
            onClick={() => setContextMenuPosition({ x: 12, y: 12 })}
          >
            Desktop Menu
          </BeveledButton>
        ) : null}

        <aside className="retro-desktop-icon-lane" aria-label="Desktop icons">
          <div className="retro-desktop-icons">
            {desktopIcons.map((icon) => (
              <button
                key={icon.id}
                type="button"
                className="retro-desktop-icon"
                onDoubleClick={() => openWindowWithSound(icon.windowId)}
                onClick={(event) => {
                  if (event.detail === 2) {
                    openWindowWithSound(icon.windowId);
                  }
                }}
              >
                <DesktopIconImage icon={icon} />
                <span className="retro-desktop-icon__label">{icon.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="retro-window-layer">
          {windowList.map((windowState) => (
            <DesktopWindow
              key={windowState.id}
              state={windowState}
              onFocus={focusWindow}
              onStartDrag={startDrag}
              onMinimize={(id) => {
                minimizeWindow(id);
                playSound("close");
              }}
              onToggleMaximize={(id) => {
                toggleMaximizeWindow(id);
                playSound("click");
              }}
              onClose={closeAndSound}
            >
            {windowState.id === "profile" ? (
              <div className="retro-content-view">
                <h2>{resumeData.headline.currentTitle}</h2>
                <p>{resumeData.headline.currentCompany}</p>
                <hr />
                <p>{resumeData.summary}</p>
                <p>
                  Quick Links:{" "}
                  <a href="#experience">Experience</a> | <a href="#skills">Skills</a> |{" "}
                  <a href="#education">Education</a>
                </p>
              </div>
            ) : null}

            {windowState.id === "experience" ? (
              <div className="retro-content-view retro-scroll-pane">
                {resumeData.experience.map((item) => (
                  <div key={`${item.company}-${item.role}`} className="retro-entry-block">
                    <strong>{item.role}</strong>
                    <div>{item.company}</div>
                    <div className="retro-muted">
                      {item.start} - {item.end}
                    </div>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}

            {windowState.id === "skills" ? (
              <div className="retro-content-view retro-scroll-pane">
                {resumeData.skills.map((group) => (
                  <div key={group.category} className="retro-entry-block">
                    <strong>{group.category}</strong>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}

            {windowState.id === "education" ? (
              <div className="retro-content-view">
                {resumeData.education.map((edu) => (
                  <div key={edu.institution} className="retro-entry-block">
                    <strong>{edu.institution}</strong>
                    <div>{edu.program}</div>
                    <div className="retro-muted">{edu.date}</div>
                    <ul>
                      {edu.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}

            {windowState.id === "explorer" ? (
              <div className="retro-explorer">
                <div className="field-row retro-explorer-toolbar">
                  <label htmlFor="retro-search">Find:</label>
                  <RecessedInput
                    id="retro-search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search desktop files..."
                  />
                  <RetroSelect
                    value={groupBy}
                    onChange={(event) => setGroupBy(event.target.value)}
                    options={[
                      { value: "section", label: "Group by section" },
                      { value: "name", label: "Group by name" },
                    ]}
                  />
                  <BeveledButton onClick={() => openWindowWithSound("error")}>
                    Error Test
                  </BeveledButton>
                </div>
                <div className="retro-explorer-panels">
                  <aside className="sunken-panel retro-explorer-tree">
                    <button type="button" onClick={() => openWindowWithSound("profile")}>
                      My Documents
                    </button>
                    <button type="button" onClick={() => openWindowWithSound("experience")}>
                      Internet Explorer
                    </button>
                    <button type="button" onClick={() => openWindowWithSound("skills")}>
                      Programs
                    </button>
                    <button type="button" onClick={() => openWindowWithSound("education")}>
                      Recycle Bin
                    </button>
                  </aside>
                  <div className="sunken-panel retro-explorer-details">
                    <div className="retro-scroll-controls">
                      <BeveledButton
                        onClick={() => explorerScrollRef.current?.scrollBy({ top: -120 })}
                      >
                        ^
                      </BeveledButton>
                      <BeveledButton
                        onClick={() => explorerScrollRef.current?.scrollBy({ top: 120 })}
                      >
                        v
                      </BeveledButton>
                    </div>
                    <div className="retro-scroll-pane" ref={explorerScrollRef}>
                      {explorerLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {windowState.id === "properties" ? (
              <div className="retro-content-view">
                <div className="field-row">
                  <RetroCheckbox
                    checked={crtEnabled}
                    onChange={(event) => setCrtEnabled(event.target.checked)}
                    label="Enable CRT overlay"
                  />
                </div>
                <div className="field-row">
                  <RetroCheckbox
                    checked={soundEnabled}
                    onChange={(event) => setSoundEnabled(event.target.checked)}
                    label="Enable system sounds"
                  />
                </div>
                <div className="field-row">
                  <label htmlFor="display-mode">Desktop mode:</label>
                  <RetroSelect
                    id="display-mode"
                    value="classic"
                    onChange={() => {}}
                    options={[
                      { value: "classic", label: "Windows 98 Classic" },
                      { value: "high", label: "High Color" },
                    ]}
                  />
                </div>
              </div>
            ) : null}

            {windowState.id === "about" ? (
              <Dialog
                title="About This Desktop"
                body={
                  <p>
                    Retro mode emulates a 1998 Windows desktop with draggable windows,
                    taskbar workflows, and classic UI controls.
                  </p>
                }
                actions={[
                  {
                    id: "ok",
                    label: "OK",
                    onClick: () => closeAndSound("about"),
                  },
                ]}
              />
            ) : null}

            {windowState.id === "loading" ? (
              <div className="retro-content-view">
                <p>Refreshing desktop items...</p>
                <ProgressBar value={68} />
              </div>
            ) : null}

            {windowState.id === "error" ? (
              <Dialog
                title="System Message"
                body={<p>Explorer encountered an unexpected issue. Please try again.</p>}
                actions={[
                  {
                    id: "ok",
                    label: "OK",
                    onClick: () => closeAndSound("error"),
                  },
                ]}
              />
            ) : null}
            </DesktopWindow>
          ))}
        </div>

        {contextMenuPosition ? (
          <ContextMenu
            x={contextMenuPosition.x}
            y={contextMenuPosition.y}
            onAction={handleContextAction}
          />
        ) : null}
      </div>

      <Taskbar
        windows={taskbarWindows}
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => {
          setIsStartMenuOpen((prev) => !prev);
          playSound("click");
        }}
        onCloseStartMenu={() => setIsStartMenuOpen(false)}
        onOpenWindow={openWindowWithSound}
        onTaskClick={handleWindowTaskClick}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled((prev) => !prev);
          playSound("click");
        }}
        crtEnabled={crtEnabled}
        onToggleCrt={() => {
          setCrtEnabled((prev) => !prev);
          playSound("click");
        }}
        trayThemeToggle={<ThemeToggle />}
      />

      {shouldShowBoot ? <BootSplash durationMs={2500} onComplete={handleBootComplete} /> : null}
    </div>
  );
}
