import { motion } from "framer-motion";
import MoodTimeline from "@/components/MoodTimeline";
import EmotionPanel from "@/components/EmotionPanel";
import StatsCard from "@/components/StatsCard";
import { Calendar, Clock, Zap, Target } from "lucide-react";

const analyticsStats = [
  { icon: Calendar, label: "Days Tracked", value: "28", change: "Streak!", positive: true },
  { icon: Clock, label: "Avg Session", value: "12m" },
  { icon: Zap, label: "Insights Generated", value: "47", change: "+8", positive: true },
  { icon: Target, label: "Goals Met", value: "5/7", change: "71%", positive: true },
];

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full"
    >
      <div>
        <h1 className="text-2xl font-bold gradient-cyan-lavender mb-1">Analytics</h1>
        <p className="text-sm text-caption">Deep dive into your emotional patterns</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodTimeline />
        <EmotionPanel />
      </div>

      {/* Insights */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">AI Insights</h3>
        <div className="space-y-3">
          {[
            "Your stress levels drop significantly after morning meditation sessions",
            "You tend to feel most happy on weekends — consider scheduling creative activities mid-week",
            "Voice analysis shows improved emotional regulation over the past 2 weeks",
          ].map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
