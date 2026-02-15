"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BeveledButton } from "@/components/retro-desktop/controls/beveled-button";
import type { DesktopWindowId, WindowState } from "@/components/retro-desktop/types";

type TaskbarProps = {
  windows: WindowState[];
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onCloseStartMenu: () => void;
  onOpenWindow: (id: DesktopWindowId) => void;
  onTaskClick: (id: DesktopWindowId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  trayThemeToggle: ReactNode;
};

const START_MENU_WINDOW_ITEMS: Array<{ id: DesktopWindowId; label: string }> = [
  { id: "profile", label: "My Documents" },
  { id: "experience", label: "Internet Explorer" },
  { id: "skills", label: "Programs" },
  { id: "education", label: "Recycle Bin" },
  { id: "explorer", label: "My Computer" },
  { id: "about", label: "About This Desktop" },
];

const QUICK_LAUNCH_ITEMS: Array<{ id: DesktopWindowId; label: string }> = [
  { id: "explorer", label: "My Computer" },
  { id: "skills", label: "Programs" },
  { id: "about", label: "About" },
];

function getClockLabel(date: Date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function Taskbar({
  windows,
  isStartMenuOpen,
  onToggleStartMenu,
  onCloseStartMenu,
  onOpenWindow,
  onTaskClick,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCrt,
  trayThemeToggle,
}: TaskbarProps) {
  const [clockLabel, setClockLabel] = useState(() => getClockLabel(new Date()));
  const startMenuRef = useRef<HTMLDivElement | null>(null);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockLabel(getClockLabel(new Date()));
    }, 60_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!isStartMenuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      const isInMenu = startMenuRef.current?.contains(target) ?? false;
      const isInButton = startButtonRef.current?.contains(target) ?? false;
      if (!isInMenu && !isInButton) {
        onCloseStartMenu();
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseStartMenu();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, [isStartMenuOpen, onCloseStartMenu]);

  const visibleWindows = useMemo(
    () => windows.filter((win) => win.isOpen),
    [windows],
  );

  return (
    <footer className="retro-taskbar">
      {isStartMenuOpen ? (
        <div className="window retro-start-menu" ref={startMenuRef}>
          <div className="retro-start-menu__brand">Windows 98</div>
          <div className="retro-start-menu__list">
            {START_MENU_WINDOW_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="retro-start-menu__item"
                onClick={() => {
                  onOpenWindow(item.id);
                  onCloseStartMenu();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <BeveledButton
        className={`retro-start-button ${isStartMenuOpen ? "is-pressed" : ""}`}
        onClick={onToggleStartMenu}
        ref={startButtonRef}
      >
        Start
      </BeveledButton>

      <div className="retro-quick-launch">
        {QUICK_LAUNCH_ITEMS.map((item) => (
          <BeveledButton
            key={item.id}
            className="retro-taskbar-mini-btn"
            onClick={() => onOpenWindow(item.id)}
          >
            {item.label}
          </BeveledButton>
        ))}
      </div>

      <div className="retro-task-buttons" role="list" aria-label="Open windows">
        {visibleWindows.map((win) => (
          <BeveledButton
            key={win.id}
            className={`retro-task-button ${win.isActive ? "is-active" : ""} ${
              win.isMinimized ? "is-minimized" : ""
            }`}
            onClick={() => onTaskClick(win.id)}
          >
            {win.title}
          </BeveledButton>
        ))}
      </div>

      <div className="retro-taskbar-tray">
        <BeveledButton className="retro-taskbar-mini-btn" onClick={onToggleSound}>
          {soundEnabled ? "SND" : "MUTE"}
        </BeveledButton>
        <BeveledButton className="retro-taskbar-mini-btn" onClick={onToggleCrt}>
          {crtEnabled ? "CRT ON" : "CRT OFF"}
        </BeveledButton>
        <div className="retro-taskbar-theme-toggle">{trayThemeToggle}</div>
        <div className="retro-taskbar-clock">{clockLabel}</div>
      </div>
    </footer>
  );
}
