"use client";

import { useEffect, useMemo, useState } from "react";
import { BeveledButton } from "@/components/retro-desktop/controls/beveled-button";
import { ProgressBar } from "@/components/retro-desktop/controls/progress-bar";

type BootSplashProps = {
  durationMs?: number;
  onComplete: () => void;
};

export function BootSplash({ durationMs = 3500, onComplete }: BootSplashProps) {
  const [elapsed, setElapsed] = useState(0);
  const progressValue = useMemo(
    () => Math.min(100, Math.round((elapsed / durationMs) * 100)),
    [durationMs, elapsed],
  );

  useEffect(() => {
    const started = Date.now();
    const interval = window.setInterval(() => {
      const nextElapsed = Date.now() - started;
      if (nextElapsed >= durationMs) {
        window.clearInterval(interval);
        setElapsed(durationMs);
        onComplete();
        return;
      }
      setElapsed(nextElapsed);
    }, 80);

    return () => {
      window.clearInterval(interval);
    };
  }, [durationMs, onComplete]);

  return (
    <div className="retro-boot-overlay" role="dialog" aria-label="Windows startup">
      <div className="window retro-boot-window">
        <div className="title-bar">
          <div className="title-bar-text">Windows 98 Startup</div>
        </div>
        <div className="window-body">
          <p className="retro-boot-text">Loading desktop environment...</p>
          <ProgressBar value={progressValue} />
          <div className="retro-boot-actions">
            <BeveledButton onClick={onComplete}>Skip</BeveledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
