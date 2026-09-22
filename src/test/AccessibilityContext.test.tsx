import type { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { AccessibilityProvider } from "../context/AccessibilityContext";
import { useAccessibility } from "../context/accessibility-context";

const STORAGE_KEY = "accessmetrics-accessibility-preferences";

const wrapper = ({ children }: { children: ReactNode }) => (
  <AccessibilityProvider>{children}</AccessibilityProvider>
);

describe("AccessibilityContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("loads persisted accessibility preferences", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ highContrast: true, textSize: 125, captions: true })
    );

    const { result } = renderHook(() => useAccessibility(), { wrapper });

    expect(result.current.state.highContrast).toBe(true);
    expect(result.current.state.textSize).toBe(125);
    expect(result.current.state.captions).toBe(true);
    expect(result.current.state.simplifiedLayout).toBe(false);
  });

  it("persists supported preference changes", () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => {
      result.current.update("highContrast", true);
      result.current.update("textSize", 140);
    });

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(stored.highContrast).toBe(true);
    expect(stored.textSize).toBe(140);
  });

  it("does not persist text-to-audio", () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => result.current.update("textToAudio", true));

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(result.current.state.textToAudio).toBe(true);
    expect(stored.textToAudio).toBeUndefined();
  });
});
