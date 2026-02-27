import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { StoryChapter } from '@/types';

interface StoryModalProps {
  chapter: StoryChapter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StoryModal({ chapter, open, onOpenChange }: StoryModalProps) {
  if (!chapter) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">{chapter.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Chapter {chapter.chapter_number} • {chapter.landscape_theme}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {chapter.full_story}
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
