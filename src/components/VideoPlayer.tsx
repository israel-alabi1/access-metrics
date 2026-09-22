import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { Loader2, Pause, Play, Volume2 } from "lucide-react";

interface VideoPlayerProps {
  captions: boolean;
}

const VIDEO_SOURCE = "/media/accessibility-demo.mp4";
const CAPTION_SOURCE = "/media/accessibility-demo.en.vtt";

export default function VideoPlayer({ captions }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch {
      setError("Video playback could not be started in this browser.");
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onWaiting = () => setLoading(true);
    const onReady = () => {
      setLoading(false);
      setError(null);
      if (Number.isFinite(video.duration)) setDuration(formatTime(video.duration));
    };
    const onTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(formatTime(video.currentTime));
    };
    const onError = () => {
      setLoading(false);
      setError("The local demo video could not be loaded.");
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const track = video?.textTracks[0];
    if (track) track.mode = captions ? "showing" : "hidden";
  }, [captions]);

  const seekTo = (clientX: number, rect: DOMRect) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    seekTo(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleProgressKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const delta = e.key === "ArrowLeft" ? -5 : 5;
      video.currentTime = Math.min(video.duration, Math.max(0, video.currentTime + delta));
    } else if (e.key === "Home") {
      e.preventDefault();
      video.currentTime = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      video.currentTime = video.duration;
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-foreground shadow-elevated">
      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          playsInline
          aria-label="AccessMetrics accessibility demonstration video"
        >
          <source src={VIDEO_SOURCE} type="video/mp4" />
          <track kind="captions" src={CAPTION_SOURCE} srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {!isPlaying && !loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              type="button"
              onClick={handlePlayPause}
              aria-label="Play video"
              className="w-16 h-16 rounded-full bg-card/20 backdrop-blur-sm border border-card/30 flex items-center justify-center cursor-pointer hover:bg-card/30 transition-all"
            >
              <Play size={24} className="text-card ml-1" fill="white" />
            </button>
          </div>
        )}

        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10" role="status" aria-label="Loading video">
            <Loader2 size={32} className="text-card animate-spin" />
          </div>
        )}

        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 z-10">
          <p className="text-xs text-card/80 font-medium">Module 3 • Lesson 2</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="text-card hover:text-white transition-colors"
            >
              {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" className="ml-0.5" />}
            </button>

            <div
              role="slider"
              tabIndex={0}
              aria-label="Video progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-valuetext={`${currentTime} of ${duration}`}
              className="flex-1 h-1 bg-card/30 rounded-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleProgressClick}
              onKeyDown={handleProgressKeyDown}
            >
              <div className="h-full bg-primary rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>

            <span className="text-xs text-card/80" aria-label={`Current time ${currentTime} of ${duration}`}>
              {currentTime} / {duration}
            </span>
            <Volume2 size={14} className="text-card/70" aria-hidden="true" />
            <span
              aria-live="polite"
              className={`text-xs font-bold border rounded px-1 py-0.5 transition-all ${
                captions ? "border-primary text-primary bg-primary/20" : "border-card/40 text-card/60"
              }`}
            >
              CC
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="absolute top-4 right-4 bg-destructive/90 text-destructive-foreground text-xs px-3 py-1.5 rounded-lg z-20" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
