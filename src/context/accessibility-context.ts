import { createContext, useContext } from "react";

export interface AccessibilityState {
  highContrast: boolean;
  simplifiedLayout: boolean;
  textToAudio: boolean;
  captions: boolean;
  showTranscript: boolean;
  textSize: number;
}

export interface AccessibilityContextType {
  state: AccessibilityState;
  update: (key: keyof AccessibilityState, value: boolean | number) => void;
}

export const AccessibilityContext =
  createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);

  if (!ctx) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }

  return ctx;
};
