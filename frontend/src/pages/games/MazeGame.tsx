import { useEffect, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mazeLayout = [
  [0, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0],
];

// 0 = empty
// 1 = wall

export default function MazeGame() {
  const navigate = useNavigate();

  const [player, setPlayer] = useState({ row: 0, col: 0 });
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  const goal = { row: 5, col: 5 };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;

      let newRow = player.row;
      let newCol = player.col;

      if (e.key === "ArrowUp") newRow--;
      if (e.key === "ArrowDown") newRow++;
      if (e.key === "ArrowLeft") newCol--;
      if (e.key === "ArrowRight") newCol++;

      if (
        newRow >= 0 &&
        newRow < mazeLayout.length &&
        newCol >= 0 &&
        newCol < mazeLayout[0].length &&
        mazeLayout[newRow][newCol] === 0
      ) {
        setPlayer({ row: newRow, col: newCol });
        setMoves((m) => m + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [player, completed]);

  useEffect(() => {
    if (player.row === goal.row && player.col === goal.col) {
      setCompleted(true);
    }
  }, [player]);

  const restart = () => {
    setPlayer({ row: 0, col: 0 });
    setMoves(0);
    setCompleted(false);
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 h-full overflow-y-auto relative">

      {/* Back */}
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
          Mood Maze
        </h1>
        <p className="text-sm text-caption">
          Use arrow keys to reach the glowing goal 🎯
        </p>
      </div>

      {/* Stats */}
      <div className="glass rounded-3xl p-6 text-center text-sm max-w-sm mx-auto">
        <span className="text-caption">Moves:</span>{" "}
        <span className="text-primary font-semibold">{moves}</span>
      </div>

      {/* Maze Grid */}
      <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">

        {mazeLayout.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isPlayer =
              player.row === rowIndex && player.col === colIndex;

            const isGoal =
              goal.row === rowIndex && goal.col === colIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition
                ${
                  cell === 1
                    ? "bg-muted"
                    : isGoal
                    ? "bg-gradient-to-br from-primary/30 to-secondary/30"
                    : "glass"
                }
                `}
              >
                {isPlayer && (
                  <div className="w-6 h-6 rounded-full bg-primary animate-pulse" />
                )}
                {isGoal && !isPlayer && (
                  <div className="w-4 h-4 rounded-full bg-secondary" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Win Screen */}
      {completed && (
        <div className="glass rounded-3xl p-6 text-center space-y-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-heading">
            🎉 You Cleared Your Mind!
          </h3>
          <p className="text-sm text-caption">
            You completed the maze in {moves} moves.
          </p>
          <button
            onClick={restart}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-xl flex items-center gap-2 mx-auto hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}