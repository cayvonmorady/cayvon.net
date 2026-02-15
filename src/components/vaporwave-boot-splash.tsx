"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useRetroMode } from "@/components/retro-mode-provider";

const BOOT_DURATION_MS = 3500;
const BOOT_SESSION_KEY = "vaporwave_boot_seen";
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function VaporwaveBootSplash() {
  const { mode } = useRetroMode();
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);

  const isVaporwave = mode === "vaporwave";
  if (!isClient || !isVaporwave) {
    return null;
  }

  const hasSeenBoot = sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
  if (hasSeenBoot || dismissed) {
    return null;
  }

  const handleComplete = () => {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    setDismissed(true);
  };

  return <VaporwaveBootDialog onComplete={handleComplete} />;
}

type VaporwaveBootDialogProps = {
  onComplete: () => void;
};

function VaporwaveBootDialog({ onComplete }: VaporwaveBootDialogProps) {
  const [elapsed, setElapsed] = useState(0);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const started = Date.now();
    const interval = window.setInterval(() => {
      const nextElapsed = Date.now() - started;
      if (nextElapsed >= BOOT_DURATION_MS) {
        window.clearInterval(interval);
        handleComplete();
        return;
      }

      setElapsed(nextElapsed);
    }, 80);

    return () => {
      window.clearInterval(interval);
    };
  }, [handleComplete]);

  const progressValue = useMemo(
    () => Math.max(4, Math.min(100, Math.round((elapsed / BOOT_DURATION_MS) * 100))),
    [elapsed],
  );

  return (
    <div className="vaporwave-boot-overlay" role="dialog" aria-label="Vaporwave startup">
      <div className="vaporwave-dialog-panel vaporwave-boot-panel rounded-2xl border border-black/10 p-4 sm:p-5">
        <div className="vaporwave-dialog-panel__titlebar">
          <span>Neon System Boot</span>
          <span>Version 9.6</span>
        </div>
        <div className="vaporwave-boot-body">
          <p className="vaporwave-boot-text">
            Loading dreamcore modules, palm shaders, and VHS memory cache...
          </p>
          <div className="vaporwave-loading-widget">
            <div className="vaporwave-loading-track">
              <span
                className="vaporwave-loading-fill"
                style={{ width: `${progressValue}%` }}
              />
            </div>
            <p className="vaporwave-boot-readout">{progressValue}% // Neon district online</p>
          </div>
          <div className="vaporwave-boot-actions">
            <button type="button" className="vaporwave-boot-enter" onClick={handleComplete}>
              Enter Plaza
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
