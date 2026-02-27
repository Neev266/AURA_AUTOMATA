import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { StoryChapter } from '@/types';

interface ChapterScene {
  chapter: StoryChapter;
  narrative: string;
  imageUrl: string;
  moodIcon: string;
  userName: string;
  wellnessScore: number;
  onPlayNarration: () => void;
}

export default function IllustratedChapterScene({
  chapter,
  narrative,
  imageUrl,
  moodIcon,
  userName,
  wellnessScore,
  onPlayNarration,
}: ChapterScene) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mb-16"
    >
      <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
        <div className="relative h-80 md:h-96 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <motion.img
            src={imageUrl}
            alt={chapter.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-4 right-4 flex items-center gap-2"
          >
            <Badge variant="secondary" className="text-lg backdrop-blur-md bg-background/80">
              {moodIcon}
            </Badge>
            <Badge variant="outline" className="backdrop-blur-md bg-background/80 border-primary/50">
              <Sparkles className="w-3 h-3 mr-1 text-primary" />
              {wellnessScore}%
            </Badge>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                {chapter.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                Chapter {chapter.chapter_number} • {chapter.landscape_theme}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/20 rounded-full" />
            <p className="text-foreground leading-relaxed pl-4 italic">
              {narrative}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              onClick={onPlayNarration}
              variant="outline"
              className="w-full group hover:bg-primary/10 hover:border-primary transition-all"
            >
              <Play className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              Listen to Narration
            </Button>
          </motion.div>
        </div>
      </Card>

      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-primary/60 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  );
}
