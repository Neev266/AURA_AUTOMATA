import type { WeeklyMoodTimeline } from '@/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface JourneyMapProps {
  timeline: WeeklyMoodTimeline[];
  className?: string;
}

export default function JourneyMap({ timeline, className }: JourneyMapProps) {
  return (
    <Card className={cn('p-6 bg-gradient-to-br from-card to-card/50 border-primary/20', className)}>
      <h3 className="text-lg font-semibold mb-6 text-center">Your Weekly Journey Map</h3>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />
        
        <div className="grid grid-cols-7 gap-2 relative z-10">
          {timeline.map((day, index) => (
            <div key={day.id} className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110',
                  getMoodStyle(day.mood_state)
                )}
              >
                {day.plot_point_icon}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-foreground">{day.day_of_week}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {day.plot_point_description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/80" />
          <span>Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary/50" />
          <span>Calm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span>Neutral</span>
        </div>
      </div>
    </Card>
  );
}

function getMoodStyle(mood: string): string {
  const styles: Record<string, string> = {
    positive: 'bg-primary/80 journey-glow border-2 border-primary',
    calm: 'bg-primary/50 border-2 border-primary/60',
    neutral: 'bg-muted border-2 border-border',
    low: 'bg-muted/50 border-2 border-border',
  };
  return styles[mood] || styles.neutral;
}
