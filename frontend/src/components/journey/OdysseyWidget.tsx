import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressPath from './ProgressPath';

interface OdysseyWidgetProps {
  chapterTitle: string;
  progress: number;
  onPlayNarration?: () => void;
}

export default function OdysseyWidget({ chapterTitle, progress, onPlayNarration }: OdysseyWidgetProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">✨</span>
          Your Odyssey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Current Chapter</p>
          <p className="font-semibold text-foreground">{chapterTitle}</p>
        </div>
        
        <ProgressPath progress={progress} />
        
        <div className="flex gap-2">
          {onPlayNarration && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPlayNarration}
              className="flex-1"
            >
              <Play className="mr-2 h-3 w-3" />
              Preview
            </Button>
          )}
          <Button asChild size="sm" className="flex-1">
            <Link to="/journey">
              View Journey
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
