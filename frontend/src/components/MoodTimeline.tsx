import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const moodData = [
  { day: "Mon", happy: 60, calm: 70, stressed: 30, score: 72 },
  { day: "Tue", happy: 55, calm: 65, stressed: 40, score: 65 },
  { day: "Wed", happy: 75, calm: 80, stressed: 15, score: 82 },
  { day: "Thu", happy: 50, calm: 60, stressed: 50, score: 55 },
  { day: "Fri", happy: 80, calm: 85, stressed: 10, score: 88 },
  { day: "Sat", happy: 90, calm: 90, stressed: 5, score: 93 },
  { day: "Sun", happy: 72, calm: 85, stressed: 23, score: 78 },
];

const MoodTimeline = () => {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">Weekly Mood Timeline</h3>
      <p className="text-xs text-caption mb-6">Your emotional journey this week</p>

      {/* Simple bar chart */}
      <div className="flex items-end justify-between gap-2 h-40 mb-4">
        {moodData.map((d, i) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              className="w-full rounded-t-lg gradient-bg-cyan opacity-80"
              initial={{ height: 0 }}
              animate={{ height: `${d.score}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
            <span className="text-[10px] text-caption">{d.day}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan" />
          <span className="text-[10px] text-caption">Wellness Score</span>
        </div>
        <span className="text-xs text-cyan font-semibold">Avg: 76%</span>
      </div>
    </div>
  );
};

export default MoodTimeline;
