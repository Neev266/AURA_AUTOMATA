import { motion } from "framer-motion";

interface AuraOrbProps {
  emotion?: string;
  size?: "sm" | "md" | "lg";
}

const emotionColors: Record<string, { inner: string; outer: string }> = {
  happy: { inner: "from-emerald-400 to-cyan-400", outer: "shadow-[0_0_80px_hsla(174,57%,56%,0.5)]" },
  calm: { inner: "from-cyan-400 to-blue-400", outer: "shadow-[0_0_80px_hsla(200,70%,50%,0.4)]" },
  stressed: { inner: "from-orange-400 to-red-400", outer: "shadow-[0_0_80px_hsla(20,80%,50%,0.4)]" },
  anxious: { inner: "from-yellow-400 to-orange-400", outer: "shadow-[0_0_80px_hsla(40,80%,50%,0.4)]" },
  sad: { inner: "from-indigo-400 to-purple-400", outer: "shadow-[0_0_80px_hsla(260,60%,50%,0.4)]" },
  neutral: { inner: "from-cyan-400 to-lavender", outer: "shadow-[0_0_80px_hsla(174,57%,56%,0.4)]" },
};

const sizes = { sm: "w-20 h-20", md: "w-36 h-36", lg: "w-52 h-52" };
const ringSizes = { sm: "w-28 h-28", md: "w-48 h-48", lg: "w-64 h-64" };

const AuraOrb = ({ emotion = "neutral", size = "lg" }: AuraOrbProps) => {
  const colors = emotionColors[emotion] || emotionColors.neutral;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse rings */}
      <div className={`absolute ${ringSizes[size]} rounded-full border border-primary/20 pulse-ring`} />
      <div className={`absolute ${ringSizes[size]} rounded-full border border-accent/10 pulse-ring`} style={{ animationDelay: "0.5s" }} />

      {/* Main orb */}
      <motion.div
        className={`relative ${sizes[size]} rounded-full bg-gradient-to-br ${colors.inner} ${colors.outer} animate-float`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        {/* Core light */}
        <div className="absolute inset-[30%] rounded-full bg-white/20 blur-sm" />
      </motion.div>
    </div>
  );
};

export default AuraOrb;
