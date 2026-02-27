import { motion } from "framer-motion";

interface EmotionPanelProps {
  emotions?: Record<string, number>; // make optional
}

const EmotionPanel = ({ emotions }: EmotionPanelProps) => {

  if (!emotions || Object.keys(emotions).length === 0) {
    return null; // prevents crash
  }

  const formatted = Object.entries(emotions)
    .map(([name, value]) => ({
      name,
      value: Number(value),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold mb-4">
        Emotion Analysis
      </h3>

      <div className="space-y-4">
        {formatted.map((emotion, i) => (
          <motion.div
            key={emotion.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize">{emotion.name}</span>
              <span>{emotion.value.toFixed(2)}%</span>
            </div>

            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${emotion.value}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmotionPanel;