import { motion } from "framer-motion";
import { useAccessibility } from "../context/accessibility-context";
import { Eye, Headphones, X } from "lucide-react";

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  highlight?: boolean;
}

function ToggleRow({ label, description, checked, onChange, highlight }: ToggleRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
        checked && highlight
          ? "bg-primary-light border border-primary/20"
          : "hover:bg-muted/50"
      }`}
    >
      <div className="flex-1 mr-4">
        <p className={`font-medium text-sm ${checked && highlight ? "text-primary" : "text-foreground"}`}>
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {checked && highlight ? `${description.replace("Enable", "").replace("enable", "").trim()} enabled` : description}
        </p>
      </div>
      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-label={label}
        aria-checked={checked}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-card rounded-full shadow-sm transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

interface AccessibilityPanelProps {
  onClose?: () => void;
}

export default function AccessibilityPanel({ onClose }: AccessibilityPanelProps) {
  const { state, update } = useAccessibility();

  return (
    <div className="w-80 bg-card shadow-elevated border border-border/60 rounded-2xl flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-border/60">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground">Accessibility Controls</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Customize your learning experience</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close accessibility controls"
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 space-y-4">
        {/* Visual Support */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Eye size={15} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Visual Support</span>
          </div>
          <div className="space-y-1">
            <ToggleRow
              label="High Contrast Mode"
              description="Increase contrast for readability"
              checked={state.highContrast}
              onChange={() => update("highContrast", !state.highContrast)}
              highlight
            />
            <ToggleRow
              label="Simplified Layout"
              description="Remove distractions for focus"
              checked={state.simplifiedLayout}
              onChange={() => update("simplifiedLayout", !state.simplifiedLayout)}
              highlight
            />
          </div>
        </div>

        {/* Text Size */}
        <div className="px-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Text Size</span>
            <span className="text-sm font-semibold text-primary">{state.textSize}%</span>
          </div>
          <div className="space-y-1">
            <label htmlFor="text-size" className="sr-only">Text size</label>
            <input
              id="text-size"
              type="range"
              min="90"
              max="150"
              step="5"
              value={state.textSize}
              onChange={(e) => update("textSize", Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>A-</span>
              <span>A+</span>
            </div>
          </div>
        </div>

        {/* Hearing Support */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Headphones size={15} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Hearing Support</span>
          </div>
          <div className="space-y-1">
            <ToggleRow
              label="Text-to-Audio"
              description="Reading aloud enabled"
              checked={state.textToAudio}
              onChange={() => update("textToAudio", !state.textToAudio)}
              highlight
            />
            <ToggleRow
              label="Auto Captions"
              description="Automatically show captions on video"
              checked={state.captions}
              onChange={() => update("captions", !state.captions)}
              highlight
            />
            <ToggleRow
              label="Show Transcript"
              description="Always display full transcript"
              checked={state.showTranscript}
              onChange={() => update("showTranscript", !state.showTranscript)}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/60">
        <div className="flex items-start gap-2.5 bg-muted/60 rounded-xl p-3">
          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
            <span className="text-primary text-[10px] font-bold">i</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Preferences are saved on this device. Text-to-Audio remains session-only.
          </p>
        </div>
        {(state.highContrast || state.captions || state.textToAudio || state.simplifiedLayout) && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-3 text-uplift"
          >
            <div className="w-2 h-2 rounded-full bg-uplift animate-pulse-green" />
            <span className="text-xs font-medium">Preferences active</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
