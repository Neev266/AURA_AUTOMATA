import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const palette = [
  "#F8E0C2",
  "#F0C7C3",
  "#D5D2FD",
  "#F5D6FF",
  "#FCE8B3",
  "#FFFFFF",
];

const GRID_SIZE = 10;

export default function ColorGame() {
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(palette[0]);
  const [grid, setGrid] = useState<string[]>(
    Array(GRID_SIZE * GRID_SIZE).fill("")
  );

  const paintTile = (index: number) => {
    const updated = [...grid];
    updated[index] = selectedColor;
    setGrid(updated);
  };

  const resetGrid = () => {
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(""));
  };

  const filledTiles = grid.filter((cell) => cell !== "").length;

  return (
    <div className="min-h-screen bg-[#F3ECE6] p-8 relative space-y-10">

      {/* Back */}
      <button
        onClick={() => navigate("/app/games")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-[#C060B0] hover:opacity-80"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-gray-900">
          Color Therapy
        </h1>
        <p className="text-gray-600 text-sm">
          Paint freely and express yourself through calming colors 🎨
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-[2rem] p-6 text-center text-sm max-w-sm mx-auto shadow-md border border-white/80">
        <span className="text-gray-600">Tiles Filled:</span>{" "}
        <span className="text-[#C060B0] font-semibold">{filledTiles}</span>
      </div>

      {/* Color Palette */}
      <div className="flex justify-center gap-4 flex-wrap">
        {palette.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(color)}
            className={`w-10 h-10 rounded-full border-2 transition ${
              selectedColor === color
                ? "border-[#C060B0] scale-110"
                : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-10 gap-2 max-w-lg mx-auto mt-6">
        {grid.map((cell, index) => (
          <div
            key={index}
            onClick={() => paintTile(index)}
            className="w-8 h-8 rounded-md cursor-pointer transition border border-gray-200 hover:shadow-sm"
            style={{
              backgroundColor: cell || "white",
            }}
          />
        ))}
      </div>

      {/* Reset */}
      <div className="flex justify-center pt-6">
        <button
          onClick={resetGrid}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#F8E0C2] to-[#D5D2FD] text-gray-900 font-semibold flex items-center gap-2 shadow-md hover:scale-105 transition"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Canvas
        </button>
      </div>
    </div>
  );
}