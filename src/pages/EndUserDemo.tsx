import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, BookOpen, CheckCircle2, Accessibility } from "lucide-react";
import { useAccessibility } from "../context/accessibility-context";
import AccessibilityPanel from "../components/AccessibilityPanel";
import VideoPlayer from "../components/VideoPlayer";
import TextToSpeech from "../components/TextToSpeech";
import Navbar from "../components/Navbar";

const ARTICLE_TEXT = [
  "Universal design helps everyone, not just those with disabilities. By implementing these standards, we create products that are fundamentally better for all users. Consider the curb cut effect: originally designed for wheelchair users, curb cuts are now essential for parents with strollers, travelers with luggage, and delivery workers.",
  "Similarly, in digital interfaces, high contrast and clear typography benefit users in bright sunlight or those experiencing temporary eye strain. When we approach design with an inclusive mindset, we stop treating accessibility as a checklist item at the end of the process and start treating it as a core design principle.",
  "This shift in perspective leads to more robust, flexible, and human-centered solutions. Research consistently shows that accessible products have higher user satisfaction scores, lower support costs, and greater market reach.",
];

export default function EndUserDemo() {
  const { state, update } = useAccessibility();
  const [panelOpen, setPanelOpen] = useState(true);

  const bgClass = state.highContrast
    ? "bg-[#000000] text-[#FFE500]"
    : "bg-background text-foreground";

  const cardClass = state.highContrast
    ? "bg-[#111111] border border-yellow-400/40"
    : "bg-card border border-border/60 shadow-card";

  return (
    <div className={`min-h-screen transition-all duration-300 ${bgClass}`}>
      <Navbar />

      {/* Module Header */}
      <div className={`fixed top-16 left-0 right-0 z-40 border-b transition-colors duration-300 ${
        state.highContrast ? "bg-black border-yellow-400/30" : "bg-card/80 backdrop-blur-xl border-border/60"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center">
              <BookOpen size={14} className="text-primary" />
            </div>
            <span className="font-display font-semibold text-sm">Module 3: Principles of Inclusive Design</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Progress: 65%</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-primary rounded-full" />
              </div>
            </div>
            <button
              onClick={() => setPanelOpen(!panelOpen)}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm hover:opacity-90 transition-all"
              title="Toggle Accessibility Controls"
            >
              <Accessibility size={16} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-6">
        <div className={`flex gap-6 transition-all duration-300 ${panelOpen ? "" : "max-w-4xl mx-auto"}`}>
          {/* Left: Content */}
          <div className="flex-1 min-w-0" style={{ fontSize: `${state.textSize}%` }}>
            {/* Screen Reader */}
            <TextToSpeech enabled={state.textToAudio} text={ARTICLE_TEXT.join(" ")} />

            {/* Video */}
            <VideoPlayer captions={state.captions} />

            {/* Article */}
            <div className={`mt-6 rounded-2xl p-6 transition-all duration-300 ${cardClass}`}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-display font-bold text-2xl">Universal Design for Learning</h2>
                {state.textToAudio && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                  >
                    <Volume2 size={14} className="text-primary-foreground" />
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                {ARTICLE_TEXT.map((para, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      state.highContrast ? "text-yellow-300" : "text-muted-foreground"
                    } ${i === 0 ? `pl-4 border-l-4 ${state.highContrast ? "border-yellow-400" : "border-primary"}` : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Transcript */}
              {state.showTranscript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`mt-6 rounded-xl p-4 text-sm leading-relaxed ${
                    state.highContrast ? "bg-yellow-400/10 text-yellow-200" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="font-semibold mb-2 text-foreground">📄 Full Transcript</p>
                  <p>Hello, and welcome to Module 3. Today we'll explore the principles of inclusive design and how they create better products for everyone. The concept of universal design began in architecture with features like curb cuts and ramps…</p>
                </motion.div>
              )}
            </div>

            {/* Quick Check - hidden in simplified layout */}
            {!state.simplifiedLayout && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 rounded-2xl p-5 transition-all duration-300 ${cardClass}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-primary" />
                  <h3 className="font-display font-semibold">Quick Check</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Which of the following best describes the "curb cut effect"?
                </p>
                {[
                  "A feature designed exclusively for disabled users",
                  "An accessibility feature that benefits all users broadly",
                  "A compliance requirement under ADA regulations",
                ].map((opt, i) => (
                  <button
                    key={i}
                    className={`w-full text-left text-sm px-4 py-3 rounded-xl border mb-2 transition-all hover:border-primary hover:bg-primary-light ${
                      state.highContrast ? "border-yellow-400/40 text-yellow-300" : "border-border text-foreground"
                    }`}
                  >
                    <span className="font-medium mr-2 text-primary">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right: Accessibility Panel */}
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-80 flex-shrink-0"
            >
              <div className="sticky top-36">
                <AccessibilityPanel onClose={() => setPanelOpen(false)} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
