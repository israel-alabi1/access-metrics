import { useEffect } from "react";

interface Props {
  enabled: boolean;
  text: string;
}

export default function TextToSpeech({ enabled, text }: Props) {
  useEffect(() => {
    if (!enabled) {
      window.speechSynthesis.cancel();
      return;
    }

    const speakText = () => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakText;
    } else {
      speakText();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [enabled, text]);

  return null;
}
