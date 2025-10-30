import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  url: string;
  isActive: boolean;
  onPlay: () => void;
  onEnded: () => void;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ url, isActive, onPlay, onEnded }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const resumeAfterSeek = useRef(false);

    useImperativeHandle(ref, () => audioRef.current!);

    // Register audio listeners
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioData = () => setDuration(audio.duration);
      const handleEnded = () => {
        setIsPlaying(false);
        onEnded();
      };
      const handleSeeked = () => {
        if (resumeAfterSeek.current) {
          resumeAfterSeek.current = false;
          audio.play().catch(() => {});
          setIsPlaying(true);
        }
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioData);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("seeked", handleSeeked);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioData);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("seeked", handleSeeked);
      };
    }, [url, onEnded]);

    // Sync play/pause when active changes
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isActive) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }, [isActive]);

    const togglePlay = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        onPlay();
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Playback error:", err);
        }
      }
    };

    // ✅ Skip fix: No pause, resume after seek automatically
    const skipTime = (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      const newTime = Math.min(
        Math.max(audio.currentTime + seconds, 0),
        audio.duration
      );

      resumeAfterSeek.current = !audio.paused; // only resume if it was playing
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const formatTime = (time: number) =>
      isNaN(time)
        ? "0:00"
        : `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(
            2,
            "0"
          )}`;

    return (
      <div
        className={`max-w-md bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-4 shadow-md ${
          isActive ? "border border-blue-400" : ""
        }`}
      >
        <div className="flex justify-center items-end h-16 gap-[3px] mb-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-400 rounded-full"
              style={{
                width: "6px",
                height: `${Math.random() * 40 + 10}px`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => skipTime(-10)} className="text-gray-700">
              <SkipBack size={22} />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full shadow"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button onClick={() => skipTime(10)} className="text-gray-700">
              <SkipForward size={22} />
            </button>
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        <audio ref={audioRef} src={url} preload="auto" />
      </div>
    );
  }
);

export default AudioPlayer;
