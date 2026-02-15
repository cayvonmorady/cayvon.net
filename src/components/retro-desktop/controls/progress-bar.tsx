"use client";

type ProgressBarProps = {
  value: number;
  max?: number;
};

export function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = (clamped / max) * 100;

  return (
    <div className="retro-progress" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={max}>
      <div className="retro-progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
