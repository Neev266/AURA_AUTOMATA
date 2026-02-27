import { useState, useEffect, useRef } from "react";
import Scene from "./avatar/Scene";

interface Props {
  audioBlob: Blob | null;
}

export default function AIVatar({ audioBlob }: Props) {
  const [lipSync, setLipSync] = useState<any>(null);
  const latestAudioRef = useRef<Blob | null>(null);

  // When Scene loads and sends controller
  const handleAvatarReady = (controller: any) => {
    console.log("🤖 Avatar ready. LipSync controller received.");
    setLipSync(controller);
  };

  // When new audio arrives
  // useEffect(() => {
  //   if (audioBlob) {
  //     console.log("🎵 Audio blob received in AIVatar");
  //     latestAudioRef.current = audioBlob;
  //   }
  // }, [audioBlob]);

  // When both lipSync + audio exist
  useEffect(() => {
    if (!lipSync) {
      console.log("⏳ Waiting for lipSync controller...");
      return;
    }

    if (lipSync && latestAudioRef.current) {
      console.log("🔥 Calling playAudioWithLipSync()");
      lipSync.playAudioWithLipSync(latestAudioRef.current);
      latestAudioRef.current = null;
    }
  }, [lipSync, audioBlob]);

  return (
    <div className="w-72 h-72 rounded-full overflow-hidden border border-cyan-400 shadow-2xl">
      <Scene onAvatarReady={handleAvatarReady} />
    </div>
  );
}