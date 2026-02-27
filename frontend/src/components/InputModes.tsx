import { motion } from "framer-motion";
import { Camera, Mic, Type } from "lucide-react";
import { useState } from "react";

const modes = [
  { id: "face", icon: Camera, label: "Face", desc: "Facial Expression Analysis" },
  { id: "voice", icon: Mic, label: "Voice", desc: "Voice Tone Detection" },
  { id: "text", icon: Type, label: "Text", desc: "Text Sentiment Analysis" },
];

const InputModes = () => {
  const [active, setActive] = useState("face");

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">Input Modes</h3>
      <p className="text-xs text-caption mb-4">Multimodal emotion detection</p>

      <div className="grid grid-cols-3 gap-3">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => setActive(mode.id)}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
              active === mode.id
                ? "gradient-bg-cyan text-primary-foreground glow-cyan"
                : "bg-muted/50 text-caption hover:bg-muted"
            }`}
          >
            <mode.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{mode.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/30">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <span className="text-[11px] text-cyan font-medium">
            {modes.find((m) => m.id === active)?.desc}
          </span>
        </div>
        <p className="text-[10px] text-caption">
          {active === "face" && "Camera access required for real-time facial expression tracking"}
          {active === "voice" && "Microphone access required for voice pattern analysis"}
          {active === "text" && "Type naturally — AI analyzes sentiment and emotional cues"}
        </p>
      </div>
    </div>
  );
};

export default InputModes;
