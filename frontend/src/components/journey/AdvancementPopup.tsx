import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AdvancementPopupProps {
  show: boolean;
  progressGained: number;
  newProgress: number;
  onClose: () => void;
}

export default function AdvancementPopup({
  show,
  progressGained,
  newProgress,
  onClose,
}: AdvancementPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (show) {
      setOpen(true);
    }
  }, [show]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center journey-glow">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl gradient-text">
            Chapter Advanced!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Your journey continues to unfold
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">+{progressGained}%</p>
            <p className="text-sm text-muted-foreground">Path Cleared</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
            <p className="text-2xl font-bold text-foreground">{newProgress}%</p>
          </div>
          <p className="text-sm text-center text-muted-foreground italic">
            "Each step forward reveals new light on the path ahead."
          </p>
        </div>
        <Button onClick={() => handleOpenChange(false)} className="w-full">
          Continue Journey
        </Button>
      </DialogContent>
    </Dialog>
  );
}
