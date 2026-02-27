import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

const EmotionDetector = () => {
  const webcamRef = useRef<Webcam>(null);

  const [dominantEmotion, setDominantEmotion] = useState<string>("Detecting...");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [stress, setStress] = useState<number | null>(null);
  const [avatarMode, setAvatarMode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const emotionColors: Record<string, string> = {
    happy: "#22c55e",
    sad: "#3b82f6",
    angry: "#ef4444",
    fear: "#a855f7",
    neutral: "#6b7280",
    surprise: "#facc15",
    disgust: "#10b981",
  };

  const capture = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageSrc }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];

        setDominantEmotion(result.emotion || "Unknown");
        setConfidence(
          typeof result.confidence === "number" ? result.confidence : null
        );
        setStress(
          typeof result.stress === "number" ? result.stress : null
        );
        setAvatarMode(result.avatar_mode || "");
        setError(null);
      } else {
        setDominantEmotion("No face detected");
        setConfidence(null);
        setStress(null);
        setAvatarMode("");
      }
    } catch (err) {
      console.error("Emotion detection error:", err);
      setError("Emotion service unavailable");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(capture, 1500);
    return () => clearInterval(interval);
  }, [capture]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Real-Time Emotion Detection</h1>

      {/* Webcam (hidden or visible) */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        width={220}
        style={{ borderRadius: "12px", marginBottom: "20px" }}
      />

      {/* Emotion Circle */}
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          margin: "20px auto",
          backgroundColor:
            emotionColors[dominantEmotion.toLowerCase()] || "#999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          transition: "all 0.4s ease",
        }}
      >
        {dominantEmotion}
      </div>

      {/* Emotion Details */}
      <div style={{ marginTop: "20px" }}>
        <h2>Current State: {dominantEmotion}</h2>

        <p>
          Confidence:{" "}
          {confidence !== null && confidence !== undefined
            ? `${confidence.toFixed(2)}%`
            : "--"}
        </p>

        <p>
          Stress Level:{" "}
          {stress !== null && stress !== undefined
            ? `${stress}%`
            : "--"}
        </p>

        <p>
          Avatar Mode: {avatarMode || "--"}
        </p>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmotionDetector;