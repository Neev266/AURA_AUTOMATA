import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gamepad2,
  Brain,
  Heart,
  Smile,
  Trophy,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

const games = [
  {
    id: 1,
    name: "Breathing Bubbles",
    description: "Pop bubbles in rhythm with your breath to reduce stress",
    icon: "🫧",
    difficulty: "Easy",
    duration: "3 min",
    route: "/games/breathing",
    benefits: ["Reduces stress", "Improves focus"],
  },
  {
    id: 2,
    name: "Memory Match",
    description: "Match positive affirmations to boost your mood",
    icon: "🧠",
    difficulty: "Medium",
    duration: "5 min",
    route: "/games/memory",
    benefits: ["Enhances memory", "Positive thinking"],
  },
  {
    id: 3,
    name: "Gratitude Garden",
    description: "Plant flowers by listing things you're grateful for",
    icon: "🌸",
    difficulty: "Easy",
    duration: "4 min",
    route: "/games/gratitude",
    benefits: ["Cultivates gratitude", "Boosts happiness"],
  },
  {
    id: 4,
    name: "Mood Maze",
    description: "Navigate through a calming maze to clear your mind",
    icon: "🎯",
    difficulty: "Medium",
    duration: "6 min",
    route: "/games/maze",
    benefits: ["Improves focus", "Reduces anxiety"],
  },
  {
    id: 5,
    name: "Color Therapy",
    description: "Create beautiful patterns with calming colors",
    icon: "🎨",
    difficulty: "Easy",
    duration: "5 min",
    route: "/games/color",
    benefits: ["Creative expression", "Relaxation"],
  },
  {
    id: 6,
    name: "Zen Stones",
    description: "Stack stones mindfully to achieve balance",
    icon: "🪨",
    difficulty: "Hard",
    duration: "7 min",
    route: "/games/zen",
    benefits: ["Mindfulness", "Patience"],
  },
];

const achievements = [
  { name: "First Steps", icon: "🌟", description: "Played your first game", unlocked: true },
  { name: "Stress Buster", icon: "💪", description: "Completed 10 games", unlocked: true },
  { name: "Zen Master", icon: "🧘", description: "Achieved perfect score", unlocked: false },
  { name: "Daily Player", icon: "📅", description: "Played 7 days in a row", unlocked: false },
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-10 space-y-10 overflow-y-auto h-full">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold gradient-cyan-lavender">
          Mood-Boosting Games
        </h1>
        <p className="text-sm text-caption">
          Play interactive activities designed to improve your mental wellness
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border border-border rounded-3xl">
          <CardContent className="pt-6 text-center space-y-2">
            <Gamepad2 className="w-8 h-8 mx-auto text-primary" />
            <div className="text-3xl font-bold text-heading">24</div>
            <p className="text-sm text-caption">Games Played</p>
          </CardContent>
        </Card>

        <Card className="glass border border-border rounded-3xl">
          <CardContent className="pt-6 text-center space-y-2">
            <Trophy className="w-8 h-8 mx-auto text-secondary" />
            <div className="text-3xl font-bold text-heading">850</div>
            <p className="text-sm text-caption">Total Score</p>
          </CardContent>
        </Card>

        <Card className="glass border border-border rounded-3xl">
          <CardContent className="pt-6 text-center space-y-2">
            <Heart className="w-8 h-8 mx-auto text-accent" />
            <div className="text-3xl font-bold text-heading">+15%</div>
            <p className="text-sm text-caption">Mood Improvement</p>
          </CardContent>
        </Card>

        <Card className="glass border border-border rounded-3xl">
          <CardContent className="pt-6 text-center space-y-2">
            <Smile className="w-8 h-8 mx-auto text-primary" />
            <div className="text-3xl font-bold text-heading">5</div>
            <p className="text-sm text-caption">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Games Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-heading">
          Available Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <Card
              key={game.id}
              className={cn(
                "glass border border-border rounded-3xl overflow-hidden hover:shadow-xl transition cursor-pointer",
                selectedGame === game.id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                {game.icon}
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-heading">
                      {game.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="rounded-full text-xs border-primary text-primary"
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-caption">
                    {game.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-caption">
                  <div className="flex items-center gap-1">
                    <Brain className="w-4 h-4 text-primary" />
                    {game.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.benefits.map((benefit) => (
                    <Badge
                      key={benefit}
                      variant="secondary"
                      className="rounded-full text-xs"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => navigate(game.route)}
                  className="w-full rounded-2xl gap-2 bg-primary text-primary-foreground hover:opacity-90"
                >
                  <Play className="w-4 h-4" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <Card className="glass border border-border rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading">
            <Trophy className="w-6 h-6 text-secondary" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.name}
                className={cn(
                  "p-6 rounded-2xl text-center space-y-2 transition border",
                  achievement.unlocked
                    ? "bg-primary/10 border-primary"
                    : "bg-muted border-border opacity-50"
                )}
              >
                <div className="text-4xl">{achievement.icon}</div>
                <h3 className="font-semibold text-heading">
                  {achievement.name}
                </h3>
                <p className="text-xs text-caption">
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="rounded-full">
                    Unlocked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="glass border border-border rounded-3xl">
        <CardHeader>
          <CardTitle className="text-heading">
            How Games Boost Your Mood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-heading">
                Cognitive Engagement
              </h3>
              <p className="text-sm text-caption">
                Games activate your brain's reward system, releasing dopamine and improving mood.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-heading">
                Stress Reduction
              </h3>
              <p className="text-sm text-caption">
                Focused gameplay helps distract from worries and reduces cortisol levels.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Smile className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-heading">
                Positive Reinforcement
              </h3>
              <p className="text-sm text-caption">
                Achievements and progress create accomplishment and boost self-esteem.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}