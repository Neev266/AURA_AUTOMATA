import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GratitudeItem {
  id: number;
  text: string;
}

export default function GratitudeGame() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [items, setItems] = useState<GratitudeItem[]>([]);

  const addGratitude = () => {
    if (!input.trim()) return;

    const newItem = {
      id: Date.now(),
      text: input.trim(),
    };

    setItems((prev) => [...prev, newItem]);
    setInput("");
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 h-full overflow-y-auto relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/app/games")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-primary hover:opacity-80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-cyan-lavender">
          Gratitude Garden
        </h1>
        <p className="text-sm text-caption">
          Plant a flower for everything you're grateful for 🌸
        </p>
      </div>

      {/* Input Section */}
      <div className="glass rounded-3xl p-6 max-w-xl mx-auto space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="I am grateful for..."
            className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={addGratitude}
            className="bg-primary text-primary-foreground px-4 rounded-xl flex items-center justify-center hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-caption text-center">
          Tip: Try adding 3 things daily 🌿
        </p>
      </div>

      {/* Garden Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto pt-6">

        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center space-y-2 animate-fadeIn"
          >
            {/* Flower */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-3xl transition-all duration-500">
              🌸
            </div>

            {/* Text */}
            <p className="text-xs text-center text-heading max-w-[120px]">
              {item.text}
            </p>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full text-center text-caption py-12">
            Your garden is empty. Start planting gratitude 🌱
          </div>
        )}
      </div>

      {/* Completion Message */}
      {items.length >= 5 && (
        <div className="glass rounded-3xl p-6 text-center space-y-3 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-heading">
            🌼 Beautiful Garden!
          </h3>
          <p className="text-sm text-caption">
            You've cultivated {items.length} moments of gratitude.
          </p>
        </div>
      )}
    </div>
  );
}