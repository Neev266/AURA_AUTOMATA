import { useEffect, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const symbols = ["🧠","🌿","🌸","🌊","🫧","⭐","🎯","🌞"];

interface CardType {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGame() {
  const navigate = useNavigate();

  const createDeck = (): CardType[] => {
    const doubled = [...symbols, ...symbols];

    return doubled
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState<CardType[]>(createDeck());
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [locked, setLocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFlip = (card: CardType) => {
    if (locked || card.flipped || card.matched) return;

    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updated);

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
      setMoves((m) => m + 1);
      setLocked(true);
    }
  };

  // Check match when two selected
  useEffect(() => {
    if (firstCard && secondCard) {
      const isMatch = firstCard.value === secondCard.value;

      setTimeout(() => {
        if (isMatch) {
          setCards((prev) =>
            prev.map((c) =>
              c.value === firstCard.value
                ? { ...c, matched: true }
                : c
            )
          );
          setMatches((m) => m + 1);
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, flipped: false }
                : c
            )
          );
        }

        setFirstCard(null);
        setSecondCard(null);
        setLocked(false);
      }, 800);
    }
  }, [secondCard]);

  // Completion check
  useEffect(() => {
    if (matches === symbols.length) {
      setCompleted(true);
    }
  }, [matches]);

  const restart = () => {
    setCards(createDeck());
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setMatches(0);
    setCompleted(false);
    setLocked(false);
  };

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
          Memory Match
        </h1>
        <p className="text-sm text-caption">
          Match all symbols 🧠
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-10 text-sm glass rounded-3xl p-6 max-w-md mx-auto">
        <div>
          <span className="text-caption">Moves</span>
          <div className="text-primary font-semibold text-lg">{moves}</div>
        </div>
        <div>
          <span className="text-caption">Matches</span>
          <div className="text-primary font-semibold text-lg">{matches}</div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-5 max-w-2xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleFlip(card)}
            className="h-24 rounded-2xl cursor-pointer"
          >
            <div className="relative w-full h-full">
              {card.flipped || card.matched ? (
                <div className="h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center text-3xl">
                  {card.value}
                </div>
              ) : (
                <div className="h-full glass rounded-2xl flex items-center justify-center text-2xl font-bold">
                  ?
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Win */}
      {completed && (
        <div className="glass rounded-3xl p-6 text-center space-y-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-heading">
            🎉 You Matched Them All!
          </h3>
          <p className="text-sm text-caption">
            Completed in {moves} moves.
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