import { useEffect, useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Phase = "inhale" | "hold" | "exhale" | "idle" | "complete";

export default function BreathingGame() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(60);
  const [scale, setScale] = useState(1);
  const [cycles, setCycles] = useState(0);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (phase === "idle" || phase === "complete") return;
    if (timeLeft <= 0) {
      setPhase("complete");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, timeLeft]);

  /* ================= BREATH LOOP ================= */
  useEffect(() => {
    if (phase === "idle" || phase === "complete") return;

    let timer: NodeJS.Timeout;

    if (phase === "inhale") {
      setScale(1.4);
      timer = setTimeout(() => setPhase("hold"), 4000);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("exhale"), 4000);
    } else if (phase === "exhale") {
      setScale(1);
      timer = setTimeout(() => {
        setCycles((c) => c + 1);
        setPhase("inhale");
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [phase]);

  const startSession = () => {
    setPhase("inhale");
    setTimeLeft(60);
    setCycles(0);
  };

  const getInstruction = () => {
    switch (phase) {
      case "inhale":
        return "Inhale Slowly...";
      case "hold":
        return "Hold...";
      case "exhale":
        return "Exhale Gently...";
      case "complete":
        return "Session Complete 🌿";
      default:
        return "Ready to Begin?";
    }
  };

  return (
    <div className="min-h-screen bg-[#F3ECE6] flex flex-col items-center justify-center p-8 relative space-y-12">

      {/* Back Button */}
      <button
        onClick={() => navigate("/app/games")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-[#C060B0] hover:opacity-80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-gray-900">
          Breathing Bubbles
        </h1>
        <p className="text-gray-600 text-sm">
          Calm your nervous system with guided breathing
        </p>
      </div>

      {/* Breathing Orb */}
      <div className="relative flex items-center justify-center">

        {/* Glow Layer */}
        <div className="absolute w-72 h-72 rounded-full bg-[#D5D2FD] opacity-40 blur-3xl" />

        {/* Animated Bubble */}
        <div
          className="rounded-full bg-gradient-to-br from-[#F8E0C2] via-[#F0C7C3] to-[#D5D2FD] shadow-xl transition-all duration-[4000ms] ease-in-out"
          style={{
            width: 240,
            height: 240,
            transform: `scale(${scale})`,
          }}
        />

        <div className="absolute text-center px-6">
          <p className="text-xl font-semibold text-gray-800">
            {getInstruction()}
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-[2rem] p-6 w-80 text-center space-y-3 shadow-md border border-white/80">
        <p className="text-sm text-gray-600">
          Time Remaining:
          <span className="text-gray-900 font-semibold ml-2">
            {timeLeft}s
          </span>
        </p>

        <p className="text-sm text-gray-600">
          Completed Cycles:
          <span className="text-[#C060B0] font-semibold ml-2">
            {cycles}
          </span>
        </p>
      </div>

      {/* Start Button */}
      {phase === "idle" && (
        <button
          onClick={startSession}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F8E0C2] to-[#D5D2FD] text-gray-900 font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition"
        >
          <Play className="w-4 h-4" />
          Start Session
        </button>
      )}

      {/* Complete Card */}
      {phase === "complete" && (
        <div className="bg-white rounded-[2rem] p-6 text-center space-y-4 shadow-lg border border-white/80">
          <h3 className="text-lg font-semibold text-gray-900">
            Great Work 🌿
          </h3>
          <p className="text-sm text-gray-600">
            You completed {cycles} breathing cycles.
          </p>
          <button
            onClick={startSession}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#F8E0C2] to-[#D5D2FD] text-gray-900 font-medium hover:scale-105 transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}