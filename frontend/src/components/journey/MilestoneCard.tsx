import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { JourneyMilestone } from '@/types';

interface MilestoneCardProps {
  milestone: JourneyMilestone | null;
  currentActivities: number;
}

export default function MilestoneCard({ milestone, currentActivities }: MilestoneCardProps) {
  if (!milestone) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Journey Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You have reached the summit. Your journey continues within.
          </p>
        </CardContent>
      </Card>
    );
  }

  const remaining = milestone.required_activities - currentActivities;
  const progress = (currentActivities / milestone.required_activities) * 100;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Next Milestone</CardTitle>
          {milestone.reward_badge && (
            <Badge variant="secondary" className="text-xs">
              🏆 {milestone.reward_badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-primary mb-1">{milestone.title}</h4>
          <p className="text-sm text-muted-foreground">{milestone.description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">
              {currentActivities} / {milestone.required_activities}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {remaining > 0 ? `${remaining} more to unlock` : 'Ready to unlock!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
