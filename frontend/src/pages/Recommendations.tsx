import { motion } from "framer-motion";
import RecommendationCards from "@/components/RecommendationCards";
import AuraOrb from "@/components/AuraOrb";

const Recommendations = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-cyan-lavender mb-1">Wellness Recommendations</h1>
          <p className="text-sm text-caption">Personalized by AURA based on your emotional patterns</p>
        </div>
        <AuraOrb size="sm" emotion="happy" />
      </div>

      {/* Today's focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 glow-cyan"
      >
        <p className="text-xs text-cyan font-medium uppercase tracking-wider mb-2">Today's Focus</p>
        <h2 className="text-lg font-semibold text-foreground mb-2">Stress Reduction & Calm</h2>
        <p className="text-sm text-caption leading-relaxed">
          Based on your recent patterns, AURA has prioritized relaxation and mindfulness activities.
          Your stress levels have been slightly elevated this week — these exercises are tailored to help.
        </p>
      </motion.div>

      <RecommendationCards />
    </motion.div>
  );
};

export default Recommendations;
