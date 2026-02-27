import { motion } from "framer-motion";
import { Wind, Moon, Music, Dumbbell, BookOpen, Heart } from "lucide-react";

const recommendations = [
  {
    icon: Wind,
    title: "Breathing Exercise",
    description: "4-7-8 technique to reduce stress and anxiety levels",
    duration: "5 min",
    category: "Relaxation",
  },
  {
    icon: Moon,
    title: "Sleep Meditation",
    description: "Guided body scan for deep, restorative sleep",
    duration: "15 min",
    category: "Sleep",
  },
  {
    icon: Music,
    title: "Mood-Boosting Playlist",
    description: "Curated tracks based on your current emotional state",
    duration: "30 min",
    category: "Music",
  },
  {
    icon: Dumbbell,
    title: "Stress Relief Workout",
    description: "Light movement exercises to release physical tension",
    duration: "10 min",
    category: "Exercise",
  },
  {
    icon: BookOpen,
    title: "Journaling Prompt",
    description: "Reflective writing exercise for emotional clarity",
    duration: "10 min",
    category: "Mindfulness",
  },
  {
    icon: Heart,
    title: "Gratitude Practice",
    description: "Identify and appreciate positive aspects of your day",
    duration: "5 min",
    category: "Wellbeing",
  },
];

const RecommendationCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec, i) => (
        <motion.div
          key={rec.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="glass rounded-2xl p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-muted group-hover:gradient-bg-cyan transition-colors">
              <rec.icon className="w-5 h-5 text-cyan group-hover:text-primary-foreground" />
            </div>
            <span className="text-[10px] font-medium text-caption uppercase tracking-wider">{rec.category}</span>
          </div>

          <h4 className="text-sm font-semibold text-foreground mb-1">{rec.title}</h4>
          <p className="text-xs text-caption leading-relaxed mb-3">{rec.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-cyan font-medium">{rec.duration}</span>
            <span className="text-xs text-caption group-hover:text-cyan transition-colors">Start →</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecommendationCards;
