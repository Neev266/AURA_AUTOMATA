import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressPathProps {
  progress: number;
  className?: string;
}

export default function ProgressPath({ progress, className }: ProgressPathProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Journey Progress</span>
        <span className="font-semibold text-primary">{progress}%</span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3 journey-glow" />
        <div
          className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        {progress < 30 && 'The path begins to clear...'}
        {progress >= 30 && progress < 60 && 'Your journey unfolds with each step...'}
        {progress >= 60 && progress < 100 && 'The sanctuary draws near...'}
        {progress === 100 && 'You have reached enlightenment!'}
      </p>
    </div>
  );
}
