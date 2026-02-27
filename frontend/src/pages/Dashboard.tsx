import { motion } from "framer-motion";
import { Heart, Brain, Activity, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import AuraOrb from "@/components/AuraOrb";
import EmotionPanel from "@/components/EmotionPanel";
import MoodTimeline from "@/components/MoodTimeline";
import InputModes from "@/components/InputModes";
import StatsCard from "@/components/StatsCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { icon: Heart, label: "Wellness Score", value: "86", change: "+12%", positive: true },
  { icon: Brain, label: "Sessions Today", value: "3", change: "+1", positive: true },
  { icon: Activity, label: "Stress Level", value: "23%", change: "-8%", positive: true },
  { icon: TrendingUp, label: "Mood Trend", value: "↑", change: "Improving", positive: true },
];

const Index = () => {
  const webcamRef = useRef<Webcam>(null);

  const [emotion, setEmotion] = useState<string>("Detecting...");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [emotions, setEmotions] = useState<Record<string, number>>({});

  const detectEmotion = async () => {
    try {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      const response = await fetch("http://localhost:8000/emotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageSrc }),
      });

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        setEmotion(result.emotion);
        setConfidence(result.confidence);
        setEmotions({
          [result.emotion]: result.confidence,
        });
      }
    } catch (error) {
      console.error("Emotion detection error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(detectEmotion, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-[#F3ECE6] p-6 lg:p-10 space-y-10"
    >

      {/* HEADER */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-black text-gray-900">
          Welcome Back
        </h1>
        <p className="text-gray-600 font-medium mt-1">
          Here's your emotional wellness overview
        </p>
      </motion.div>

      {/* STATS GRID */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-[2rem] p-6 shadow-md border border-white/80"
          >
            <StatsCard {...s} />
          </div>
        ))}
      </motion.div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT - CAMERA + ORB */}
        <motion.div
          variants={item}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-lg border border-white/80"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Webcam */}
            <div className="flex flex-col items-center">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={240}
                className="rounded-xl shadow-md mb-6"
              />

              <p className="text-sm font-semibold text-gray-700">
                Current State:
                <span className="ml-2 capitalize text-[#C060B0]">
                  {emotion}
                </span>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Confidence:{" "}
                {confidence !== null ? `${confidence.toFixed(2)}%` : "--"}
              </p>
            </div>

            {/* Aura Orb */}
            <div className="flex justify-center">
              <AuraOrb emotion={emotion} size="lg" />
            </div>

          </div>
        </motion.div>

        {/* RIGHT - INPUT MODES */}
        <motion.div
          variants={item}
          className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-white/80 flex flex-col justify-center"
        >
          <InputModes />
        </motion.div>

      </div>

      {/* EMOTION DISTRIBUTION PANEL */}
      <motion.div
        variants={item}
        className="bg-white rounded-[2.5rem] p-8 shadow-md border border-white/80"
      >
        <EmotionPanel emotions={emotions} />
      </motion.div>

      {/* WEEKLY / MONTHLY TIMELINE SECTION */}
      <motion.div
        variants={item}
        className="bg-gradient-to-br from-[#F8E0C2] via-[#F5D6FF] to-[#D5D2FD] rounded-[2.5rem] p-8 shadow-lg"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Mood Timeline
          </h2>
          <p className="text-sm text-gray-700">
            Track your emotional pattern weekly and monthly
          </p>
        </div>

        {/* This keeps your internal weekly/month toggle intact */}
        <MoodTimeline />
      </motion.div>

    </motion.div>
  );
};

export default Index;