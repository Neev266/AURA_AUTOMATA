import React from "react";

interface Props {
  onStop: () => void;
  onCancel: () => void;
}

const VoiceModal: React.FC<Props> = ({ onStop, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#0B1C2D] p-6 rounded-2xl text-center w-80 shadow-xl">

        <div className="text-xl mb-4 text-cyan-400 animate-pulse">
          🎤 Listening...
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onStop}
            className="px-4 py-2 bg-green-500 rounded-lg text-white"
          >
            Stop & Send
          </button>

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 rounded-lg text-white"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default VoiceModal;