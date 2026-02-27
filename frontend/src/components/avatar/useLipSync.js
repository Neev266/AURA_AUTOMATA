import { useRef, useEffect } from "react";

export default function useLipSync(scene) {
  const meshRef = useRef(null);
  const animationRef = useRef(null);
  const blinkTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);

  const JAW = 34;
  const SMILE_L = 47;
  const SMILE_R = 48;
  const FUNNEL = 36;
  const CHEEK_L = 32;
  const CHEEK_R = 33;
  const BLINK_L = 50;
  const BLINK_R = 51;

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (
        child.isMesh &&
        child.name === "Wolf3D_Avatar" &&
        child.morphTargetInfluences
      ) {
        meshRef.current = child;
      }
    });

    startBlinking();
  }, [scene]);

  // 👁 Natural blinking loop
  const startBlinking = () => {
    const blink = () => {
      if (!meshRef.current) return;

      const influences = meshRef.current.morphTargetInfluences;

      influences[BLINK_L] = 1;
      influences[BLINK_R] = 1;

      setTimeout(() => {
        influences[BLINK_L] = 0;
        influences[BLINK_R] = 0;
      }, 120);

      blinkTimeoutRef.current = setTimeout(
        blink,
        2000 + Math.random() * 3000
      );
    };

    blink();
  };

  const playAudioWithLipSync = async (audioBlob, text = "") => {
  if (!meshRef.current) return;

  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);

  if (!audioContextRef.current) {
    audioContextRef.current =
      new (window.AudioContext || window.webkitAudioContext)();
  }

  const audioContext = audioContextRef.current;
  await audioContext.resume();

  const source = audioContext.createMediaElementSource(audio);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  const influences = meshRef.current.morphTargetInfluences;

  const JAW = 34;
  const SMILE_L = 47;
  const SMILE_R = 48;
  const FUNNEL = 36;

  // 🧠 Text-based softness scaling
  const wordCount = text.split(" ").length;
  const pacingFactor = Math.min(wordCount / 12, 1);

  const MAX_JAW_OPEN = 0.45; // 👈 limit max opening
  const smooth = (current, target) =>
    current + (target - current) * 0.18;

  const animate = () => {
    analyser.getByteFrequencyData(dataArray);

    const volume =
      dataArray.reduce((a, b) => a + b, 0) /
      dataArray.length;

    let strength = volume / 80; // softer curve

    strength = Math.min(strength, MAX_JAW_OPEN);
    strength *= 0.7 + pacingFactor * 0.3;

    // 👄 Controlled jaw
    influences[JAW] = smooth(
      influences[JAW],
      strength
    );

    // 😊 Always slight smile (cute mode)
    influences[SMILE_L] = smooth(
      influences[SMILE_L],
      0.15
    );
    influences[SMILE_R] = smooth(
      influences[SMILE_R],
      0.15
    );

    // 💬 Subtle mouth shaping
    influences[FUNNEL] = smooth(
      influences[FUNNEL],
      strength * 0.3
    );

    if (!audio.paused) {
      requestAnimationFrame(animate);
    }
  };

  audio.onplay = () => animate();

  audio.onended = () => {
    influences[JAW] = 0;
    influences[FUNNEL] = 0;

    source.disconnect();
    analyser.disconnect();
  };

  await audio.play();
};

  return { playAudioWithLipSync };
}