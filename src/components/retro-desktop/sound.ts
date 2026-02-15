export type RetroSoundEvent = "click" | "open" | "close" | "error";

export type RetroSoundEngine = {
  setEnabled: (enabled: boolean) => void;
  play: (event: RetroSoundEvent) => void;
  isEnabled: () => boolean;
};

function playTone(
  ctx: AudioContext,
  frequency: number,
  durationMs: number,
  gainValue: number,
  type: OscillatorType = "square",
  startOffsetMs = 0,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime + startOffsetMs / 1000;

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = gainValue;

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + durationMs / 1000);
}

export function createRetroSoundEngine(): RetroSoundEngine {
  let enabled = false;
  let ctx: AudioContext | null = null;

  const ensureContext = () => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!ctx) {
      const AudioCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) {
        return null;
      }
      ctx = new AudioCtor();
    }

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    return ctx;
  };

  return {
    setEnabled(nextEnabled) {
      enabled = nextEnabled;
      if (nextEnabled) {
        ensureContext();
      }
    },
    play(event) {
      if (!enabled) {
        return;
      }
      const audio = ensureContext();
      if (!audio) {
        return;
      }

      if (event === "click") {
        playTone(audio, 920, 35, 0.045, "square");
        return;
      }

      if (event === "open") {
        playTone(audio, 690, 55, 0.05, "square");
        playTone(audio, 930, 55, 0.04, "square", 48);
        return;
      }

      if (event === "close") {
        playTone(audio, 880, 60, 0.045, "square");
        playTone(audio, 620, 60, 0.04, "square", 45);
        return;
      }

      if (event === "error") {
        playTone(audio, 220, 150, 0.06, "sawtooth");
        playTone(audio, 180, 150, 0.05, "square", 140);
      }
    },
    isEnabled() {
      return enabled;
    },
  };
}
