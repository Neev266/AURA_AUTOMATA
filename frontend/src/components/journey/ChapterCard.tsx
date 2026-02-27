import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StoryChapter } from '@/types';

interface ChapterCardProps {
  chapter: StoryChapter;
  userName: string;
}

export default function ChapterCard({ chapter, userName }: ChapterCardProps) {
  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl gradient-text">{chapter.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {chapter.description.replace('You', userName)}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-2xl">{getLandscapeEmoji(chapter.landscape_theme)}</span>
          <span>{chapter.landscape_theme}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function getLandscapeEmoji(theme: string): string {
  const emojiMap: Record<string, string> = {
    'Misty Forest': '🌫️',
    'Riverside Forest': '🌊',
    'Sacred Banyan Grove': '🌳',
    'Mountain Summit': '⛰️',
  };
  return emojiMap[theme] || '🌿';
}
