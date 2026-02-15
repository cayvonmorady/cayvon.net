"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SpecialMode = "none" | "retro" | "vaporwave";

type RetroModeContextValue = {
  mode: SpecialMode;
  isRetro: boolean;
  isVaporwave: boolean;
  isSpecialMode: boolean;
  deactivateMode: () => void;
};

const RetroModeContext = createContext<RetroModeContextValue | undefined>(
  undefined,
);

const SECRET_MODES = [
  { word: "retro", mode: "retro" },
  { word: "vaporwave", mode: "vaporwave" },
] as const;
const ARM_WINDOW_MS = 5000;

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

export function RetroModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SpecialMode>("none");
  const isArmedRef = useRef(false);
  const typedSequenceRef = useRef("");
  const armTimeoutRef = useRef<number | null>(null);

  const clearArmWindow = useCallback(() => {
    isArmedRef.current = false;
    typedSequenceRef.current = "";

    if (armTimeoutRef.current !== null) {
      window.clearTimeout(armTimeoutRef.current);
      armTimeoutRef.current = null;
    }
  }, []);

  const deactivateMode = useCallback(() => {
    setMode("none");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("retro", "vaporwave");

    if (mode !== "none") {
      root.classList.add(mode);
    }

    return () => {
      root.classList.remove("retro", "vaporwave");
    };
  }, [mode]);

  useEffect(() => {
    const armSequence = () => {
      isArmedRef.current = true;
      typedSequenceRef.current = "";

      if (armTimeoutRef.current !== null) {
        window.clearTimeout(armTimeoutRef.current);
      }

      armTimeoutRef.current = window.setTimeout(() => {
        clearArmWindow();
      }, ARM_WINDOW_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!isArmedRef.current) {
        return;
      }

      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key.length !== 1) {
        return;
      }

      const typedChar = event.key.toLowerCase();
      const nextSequence = `${typedSequenceRef.current}${typedChar}`;
      const continuesKnownPrefix = SECRET_MODES.some(({ word }) =>
        word.startsWith(nextSequence),
      );

      if (continuesKnownPrefix) {
        typedSequenceRef.current = nextSequence;
      } else {
        const startsKnownPrefix = SECRET_MODES.some(({ word }) =>
          word.startsWith(typedChar),
        );
        typedSequenceRef.current = startsKnownPrefix ? typedChar : "";
      }

      const matchedMode = SECRET_MODES.find(
        ({ word }) => word === typedSequenceRef.current,
      )?.mode;

      if (matchedMode) {
        setMode(matchedMode);
        clearArmWindow();
      }
    };

    window.addEventListener("pointerdown", armSequence);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", armSequence);
      window.removeEventListener("keydown", onKeyDown);
      clearArmWindow();
    };
  }, [clearArmWindow]);

  const isRetro = mode === "retro";
  const isVaporwave = mode === "vaporwave";
  const isSpecialMode = mode !== "none";

  const contextValue = useMemo(
    () => ({
      mode,
      isRetro,
      isVaporwave,
      isSpecialMode,
      deactivateMode,
    }),
    [deactivateMode, isRetro, isSpecialMode, isVaporwave, mode],
  );

  return (
    <RetroModeContext.Provider value={contextValue}>
      {children}
    </RetroModeContext.Provider>
  );
}

export function useRetroMode(): RetroModeContextValue {
  const context = useContext(RetroModeContext);

  if (!context) {
    throw new Error("useRetroMode must be used within a RetroModeProvider");
  }

  return context;
}
