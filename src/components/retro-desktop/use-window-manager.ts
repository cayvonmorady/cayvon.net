"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { DesktopWindowId, WindowState } from "@/components/retro-desktop/types";

const WINDOW_TITLES: Record<DesktopWindowId, string> = {
  profile: "My Documents - Profile",
  experience: "Internet Explorer - Experience",
  skills: "Programs - Skills",
  education: "Recycle Bin - Education",
  explorer: "My Computer",
  about: "About This Desktop",
  error: "System Message",
  loading: "Loading",
  properties: "Display Properties",
};

type DesktopBounds = {
  width: number;
  height: number;
};

type WindowManagerOptions = {
  bounds: DesktopBounds;
  taskbarHeight: number;
};

type RestoreRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type WindowRecord = Record<DesktopWindowId, WindowState>;

type WindowLayoutConstraints = {
  bounds: DesktopBounds;
  taskbarHeight: number;
};

const MIN_VISIBLE_TITLEBAR_PX = 120;

function shouldDebugClamp() {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return false;
  }
  const debugWindow = window as Window & { __RETRO_DEBUG_CLAMP__?: boolean };
  return Boolean(debugWindow.__RETRO_DEBUG_CLAMP__);
}

function createInitialWindows(): WindowRecord {
  return {
    profile: {
      id: "profile",
      title: WINDOW_TITLES.profile,
      x: 48,
      y: 62,
      width: 390,
      height: 280,
      zIndex: 10,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    experience: {
      id: "experience",
      title: WINDOW_TITLES.experience,
      x: 118,
      y: 108,
      width: 520,
      height: 322,
      zIndex: 11,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    skills: {
      id: "skills",
      title: WINDOW_TITLES.skills,
      x: 182,
      y: 76,
      width: 360,
      height: 300,
      zIndex: 12,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    education: {
      id: "education",
      title: WINDOW_TITLES.education,
      x: 226,
      y: 134,
      width: 380,
      height: 250,
      zIndex: 13,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    explorer: {
      id: "explorer",
      title: WINDOW_TITLES.explorer,
      x: 90,
      y: 46,
      width: 620,
      height: 370,
      zIndex: 14,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    about: {
      id: "about",
      title: WINDOW_TITLES.about,
      x: 154,
      y: 130,
      width: 360,
      height: 220,
      zIndex: 15,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    error: {
      id: "error",
      title: WINDOW_TITLES.error,
      x: 210,
      y: 160,
      width: 330,
      height: 170,
      zIndex: 16,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    loading: {
      id: "loading",
      title: WINDOW_TITLES.loading,
      x: 210,
      y: 160,
      width: 310,
      height: 156,
      zIndex: 17,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
    properties: {
      id: "properties",
      title: WINDOW_TITLES.properties,
      x: 200,
      y: 96,
      width: 350,
      height: 250,
      zIndex: 18,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      isActive: false,
    },
  };
}

function getWorkspaceBounds(bounds: DesktopBounds, taskbarHeight: number): DesktopBounds {
  return {
    width: Math.max(1, Math.floor(bounds.width)),
    height: Math.max(1, Math.floor(bounds.height - taskbarHeight)),
  };
}

function clampWindow(win: WindowState, constraints: WindowLayoutConstraints): WindowState {
  const workspace = getWorkspaceBounds(constraints.bounds, constraints.taskbarHeight);
  const maxWidth = Math.max(1, workspace.width);
  const maxHeight = Math.max(1, workspace.height);

  if (win.isMaximized) {
    const clamped = {
      ...win,
      x: 0,
      y: 0,
      width: maxWidth,
      height: maxHeight,
    };
    if (shouldDebugClamp()) {
      console.debug("[retro-clamp]", {
        id: win.id,
        mode: "maximized",
        input: { x: win.x, y: win.y, width: win.width, height: win.height },
        output: { x: clamped.x, y: clamped.y, width: clamped.width, height: clamped.height },
        bounds: { minX: 0, maxX: Math.max(0, workspace.width - clamped.width), maxY: 0 },
        workspace,
      });
    }
    return clamped;
  }

  const minWidth = Math.min(220, maxWidth);
  const minHeight = Math.min(140, maxHeight);
  const width = Math.max(minWidth, Math.min(win.width, maxWidth));
  const height = Math.max(minHeight, Math.min(win.height, maxHeight));
  const visibleTitlebar = Math.max(1, Math.min(MIN_VISIBLE_TITLEBAR_PX, width));
  const minX = visibleTitlebar - width;
  const maxX = Math.max(minX, workspace.width - visibleTitlebar);
  const maxY = Math.max(0, workspace.height - height);

  const clamped = {
    ...win,
    x: Math.max(minX, Math.min(win.x, maxX)),
    y: Math.max(0, Math.min(win.y, maxY)),
    width,
    height,
  };
  if (shouldDebugClamp()) {
    console.debug("[retro-clamp]", {
      id: win.id,
      mode: "normal",
      input: { x: win.x, y: win.y, width: win.width, height: win.height },
      output: { x: clamped.x, y: clamped.y, width: clamped.width, height: clamped.height },
      bounds: { minX, maxX, maxY },
      workspace,
    });
  }
  return clamped;
}

function hasWindowLayoutChanged(before: WindowState, after: WindowState) {
  return (
    before.x !== after.x ||
    before.y !== after.y ||
    before.width !== after.width ||
    before.height !== after.height
  );
}

export function useWindowManager({
  bounds,
  taskbarHeight,
}: WindowManagerOptions) {
  const [windows, setWindows] = useState<WindowRecord>(createInitialWindows);
  const windowsRef = useRef(windows);
  const zCounterRef = useRef(50);
  const constraintsRef = useRef<WindowLayoutConstraints>({
    bounds,
    taskbarHeight,
  });
  const restoreRectsRef = useRef<Partial<Record<DesktopWindowId, RestoreRect>>>(
    {},
  );

  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  useEffect(() => {
    constraintsRef.current = {
      bounds,
      taskbarHeight,
    };
  }, [bounds, taskbarHeight]);

  const nextZIndex = useCallback(() => {
    zCounterRef.current += 1;
    return zCounterRef.current;
  }, []);

  const activateWindow = useCallback(
    (id: DesktopWindowId, next: WindowRecord): WindowRecord => {
      const updated = { ...next };
      for (const key of Object.keys(updated) as DesktopWindowId[]) {
        updated[key] = { ...updated[key], isActive: false };
      }
      const target = updated[id];
      updated[id] = {
        ...target,
        isActive: true,
        zIndex: nextZIndex(),
      };
      return updated;
    },
    [nextZIndex],
  );

  const focusWindow = useCallback(
    (id: DesktopWindowId) => {
      setWindows((prev) => {
        const target = prev[id];
        if (!target.isOpen) {
          return prev;
        }
        return activateWindow(id, { ...prev });
      });
    },
    [activateWindow],
  );

  const openWindow = useCallback(
    (id: DesktopWindowId) => {
      setWindows((prev) => {
        const next = { ...prev };
        const target = next[id];
        next[id] = {
          ...target,
          isOpen: true,
          isMinimized: false,
          isActive: true,
        };
        next[id] = clampWindow(next[id], constraintsRef.current);
        return activateWindow(id, next);
      });
    },
    [activateWindow],
  );

  const closeWindow = useCallback((id: DesktopWindowId) => {
    setWindows((prev) => {
      const next = { ...prev };
      const target = next[id];
      next[id] = {
        ...target,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        isActive: false,
      };
      delete restoreRectsRef.current[id];
      return next;
    });
  }, []);

  const minimizeWindow = useCallback((id: DesktopWindowId) => {
    setWindows((prev) => {
      const next = { ...prev };
      const target = next[id];
      next[id] = {
        ...target,
        isMinimized: true,
        isActive: false,
      };
      return next;
    });
  }, []);

  const toggleMaximizeWindow = useCallback(
    (id: DesktopWindowId) => {
      setWindows((prev) => {
        const next = { ...prev };
        const target = next[id];

        if (!target.isMaximized) {
          restoreRectsRef.current[id] = {
            x: target.x,
            y: target.y,
            width: target.width,
            height: target.height,
          };

          next[id] = clampWindow(
            {
              ...target,
              isMaximized: true,
              isMinimized: false,
            },
            constraintsRef.current,
          );
        } else {
          const restoreRect = restoreRectsRef.current[id];
          next[id] = {
            ...target,
            x: restoreRect?.x ?? target.x,
            y: restoreRect?.y ?? target.y,
            width: restoreRect?.width ?? target.width,
            height: restoreRect?.height ?? target.height,
            isMaximized: false,
          };
          delete restoreRectsRef.current[id];
          next[id] = clampWindow(next[id], constraintsRef.current);
        }

        return activateWindow(id, next);
      });
    },
    [activateWindow],
  );

  const openAllWindows = useCallback((ids?: DesktopWindowId[]) => {
    setWindows((prev) => {
      const next = { ...prev };
      const targets = ids ?? (Object.keys(next) as DesktopWindowId[]);
      if (targets.length === 0) {
        return prev;
      }

      let lastId = targets[0];
      for (const id of targets) {
        next[id] = {
          ...next[id],
          isOpen: true,
          isMinimized: false,
        };
        next[id] = clampWindow(next[id], constraintsRef.current);
        lastId = id;
      }
      return activateWindow(lastId, next);
    });
  }, [activateWindow]);

  const closeAllWindows = useCallback(() => {
    setWindows((prev) => {
      const next = { ...prev };
      for (const id of Object.keys(next) as DesktopWindowId[]) {
        next[id] = {
          ...next[id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
          isActive: false,
        };
      }
      restoreRectsRef.current = {};
      return next;
    });
  }, []);

  const startDrag = useCallback(
    (id: DesktopWindowId, event: ReactPointerEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return;
      }

      const win = windowsRef.current[id];
      if (!win || !win.isOpen || win.isMinimized || win.isMaximized) {
        return;
      }

      event.preventDefault();
      focusWindow(id);

      const origin = { x: win.x, y: win.y };
      const pointerOrigin = { x: event.clientX, y: event.clientY };

      const onMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - pointerOrigin.x;
        const dy = moveEvent.clientY - pointerOrigin.y;

        setWindows((prev) => {
          const next = { ...prev };
          const target = next[id];
          if (!target || target.isMaximized || target.isMinimized || !target.isOpen) {
            return prev;
          }

          next[id] = clampWindow(
            {
              ...target,
              x: origin.x + dx,
              y: origin.y + dy,
            },
            constraintsRef.current,
          );
          return next;
        });
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
    },
    [focusWindow],
  );

  const applyBounds = useCallback((nextBounds: DesktopBounds) => {
    constraintsRef.current = {
      ...constraintsRef.current,
      bounds: nextBounds,
    };

    setWindows((prev) => {
      const next = { ...prev };
      let didChange = false;

      for (const id of Object.keys(next) as DesktopWindowId[]) {
        const current = next[id];
        const clamped = clampWindow(current, constraintsRef.current);
        if (hasWindowLayoutChanged(current, clamped)) {
          next[id] = clamped;
          didChange = true;
        }
      }

      return didChange ? next : prev;
    });
  }, []);

  const windowList = useMemo(
    () => (Object.values(windows) as WindowState[]).sort((a, b) => a.zIndex - b.zIndex),
    [windows],
  );

  const taskbarWindows = useMemo(
    () => windowList.filter((win) => win.isOpen),
    [windowList],
  );

  return {
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
  };
}
