import {useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AccessibilityContext,
  type AccessibilityState,
} from "./accessibility-context";

const STORAGE_KEY = "accessmetrics-accessibility-preferences";

const DEFAULT_STATE: AccessibilityState = {
  highContrast: false,
  simplifiedLayout: false,
  textToAudio: false,
  captions: false,
  showTranscript: false,
  textSize: 100,
};

const PERSISTED_KEYS: Array<keyof AccessibilityState> = [
  "highContrast",
  "simplifiedLayout",
  "captions",
  "showTranscript",
  "textSize",
];

function loadPersistedState(): AccessibilityState {
  if (typeof window === "undefined") return DEFAULT_STATE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;

    const parsed = JSON.parse(stored) as Partial<AccessibilityState>;

    return {
      highContrast:
        typeof parsed.highContrast === "boolean"
          ? parsed.highContrast
          : DEFAULT_STATE.highContrast,
      simplifiedLayout:
        typeof parsed.simplifiedLayout === "boolean"
          ? parsed.simplifiedLayout
          : DEFAULT_STATE.simplifiedLayout,
      captions:
        typeof parsed.captions === "boolean"
          ? parsed.captions
          : DEFAULT_STATE.captions,
      showTranscript:
        typeof parsed.showTranscript === "boolean"
          ? parsed.showTranscript
          : DEFAULT_STATE.showTranscript,
      textSize:
        typeof parsed.textSize === "number" &&
        Number.isFinite(parsed.textSize)
          ? Math.min(150, Math.max(90, parsed.textSize))
          : DEFAULT_STATE.textSize,
      // Text-to-audio is intentionally session-only so a page reload never
      // starts speech unexpectedly.
      textToAudio: false,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export const AccessibilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<AccessibilityState>(loadPersistedState);

  const update = (
    key: keyof AccessibilityState,
    value: boolean | number,
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    try {
      const persistedState = PERSISTED_KEYS.reduce<
        Partial<AccessibilityState>
      >((preferences, key) => {
        preferences[key] = state[key];
        return preferences;
      }, {});

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(persistedState),
      );
    } catch {
      // Preferences remain functional for the current session if storage is unavailable.
    }
  }, [state]);

  return (
    <AccessibilityContext.Provider value={{ state, update }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

