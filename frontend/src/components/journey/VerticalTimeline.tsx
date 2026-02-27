import { motion } from 'framer-motion';
import type { WeeklyMoodTimeline } from '@/types';
import { cn } from '@/lib/utils';

interface VerticalTimelineProps {
  timeline: WeeklyMoodTimeline[];
  className?: string;
}

export default function VerticalTimeline({ timeline, className }: VerticalTimelineProps) {
  return (
    <div className={cn('relative py-8', className)}>
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />

      <div className="space-y-6">
        {timeline.map((day, index) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative flex items-start gap-6"
          >
            <div className="relative z-10">
              <motion.div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 border-background',
                  getMoodStyle(day.mood_state)
                )}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {day.plot_point_icon}
              </motion.div>
            </div>

            <motion.div
              className="flex-1 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4"
              whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{day.day_of_week}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{day.plot_point_description}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={cn('w-2 h-2 rounded-full', getMoodDotStyle(day.mood_state))} />
                <span className="text-xs capitalize text-muted-foreground">{day.mood_state}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getMoodStyle(mood: string): string {
  const styles: Record<string, string> = {
    positive: 'bg-primary/80 journey-glow shadow-lg shadow-primary/30',
    calm: 'bg-primary/50 shadow-md shadow-primary/20',
    neutral: 'bg-muted shadow-sm',
    low: 'bg-muted/50',
  };
  return styles[mood] || styles.neutral;
}

function getMoodDotStyle(mood: string): string {
  const styles: Record<string, string> = {
    positive: 'bg-primary animate-pulse',
    calm: 'bg-primary/70',
    neutral: 'bg-muted-foreground',
    low: 'bg-muted-foreground/50',
  };
  return styles[mood] || styles.neutral;
}
