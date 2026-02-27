import { useState, useRef, useEffect } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Stone {
  id: number;
  width: number;
  offset: number;
}

export default function ZenGame() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const generateStone = (id: number): Stone => ({
    id,
    width: 100 + Math.random() * 80,
    offset: 0,
  });

  const [stack, setStack] = useState<Stone[]>([]);
  const [currentStone, setCurrentStone] = useState<Stone>(generateStone(0));
  const [gameOver, setGameOver] = useState(false);
  const [falling, setFalling] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameOver || falling) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const center = e.clientX - rect.left;
    const offset = center - currentStone.width / 2;

    setCurrentStone({
      ...currentStone,
      offset: Math.max(0, Math.min(offset, rect.width - currentStone.width)),
    });
  };

  const placeStone = () => {
    if (gameOver || falling) return;

    if (stack.length === 0) {
      setStack([currentStone]);
      setCurrentStone(generateStone(1));
      return;
    }

    const last = stack[stack.length - 1];

    const currentCenter = currentStone.offset + currentStone.width / 2;
    const lastLeft = last.offset;
    const lastRight = last.offset + last.width;

    if (currentCenter < lastLeft || currentCenter > lastRight) {
      triggerCollapse();
      return;
    }

    setStack((prev) => [...prev, currentStone]);
    setCurrentStone(generateStone(currentStone.id + 1));
  };

  const triggerCollapse = () => {
    setFalling(true);
    setTimeout(() => setGameOver(true), 700);
  };

  const restart = () => {
    setStack([]);
    setCurrentStone(generateStone(0));
    setGameOver(false);
    setFalling(false);
  };

  // Auto scroll upward
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [stack]);

  return (
    <div className="p-6 lg:p-10 space-y-10 h-full overflow-y-auto relative">

      {/* Back */}
      <button
        onClick={() => navigate("/app/games")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-cyan-lavender">
          Zen Stones
        </h1>
        <p className="text-sm text-caption">
          Drag to position. Click to place. Keep it balanced 🪨
        </p>
      </div>

      {/* Score */}
      <div className="glass rounded-3xl p-6 text-center text-sm max-w-sm mx-auto">
        <span className="text-caption">Stack Height:</span>{" "}
        <span className="text-primary font-semibold">{stack.length}</span>
      </div>

      {/* Stack Area */}
      <div
        ref={containerRef}
        className="mx-auto max-w-md h-[450px] glass rounded-3xl overflow-y-auto flex flex-col-reverse items-center relative"
        onMouseMove={handleMove}
      >
        {/* Current Stone */}
        {!gameOver && (
          <div
            onClick={placeStone}
            className="h-6 rounded-full bg-gradient-to-r from-primary to-secondary cursor-pointer transition"
            style={{
              width: currentStone.width,
              marginLeft: currentStone.offset,
            }}
          />
        )}

        {/* Placed Stones */}
        {stack.map((stone) => (
          <div
            key={stone.id}
            className={`h-6 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 transition ${
              falling ? "opacity-0 translate-y-20" : ""
            }`}
            style={{
              width: stone.width,
              marginLeft: stone.offset,
            }}
          />
        ))}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="glass rounded-3xl p-6 text-center space-y-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-heading">
            ⚖️ Balance Lost
          </h3>
          <p className="text-sm text-caption">
            You stacked {stack.length} stones.
          </p>
          <button
            onClick={restart}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-xl flex items-center gap-2 mx-auto hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}