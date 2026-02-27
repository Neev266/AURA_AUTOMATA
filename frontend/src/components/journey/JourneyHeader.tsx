import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';

interface JourneyHeaderProps {
  userName: string;
  currentChapter: string;
  progress: number;
  wellnessScore: number;
}

export default function JourneyHeader({
  userName,
  currentChapter,
  progress,
  wellnessScore,
}: JourneyHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/30 p-8 mb-8">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />

      <div className="relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              Your Personal Odyssey
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            {userName}'s Odyssey: The Wanderer's Voyage
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-muted-foreground text-lg max-w-3xl"
        >
          Like the monsoon storms of Mumbai that give way to clear skies, your journey through
          the mystical realms reveals the sanctuary within. Each step forward illuminates the path ahead.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Journey Progress</p>
              <p className="text-2xl font-bold text-primary">{progress}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wellness Score</p>
              <p className="text-2xl font-bold text-foreground">{wellnessScore}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary/20 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
              🧭
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Chapter</p>
              <p className="text-sm font-semibold text-foreground line-clamp-1">{currentChapter}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
