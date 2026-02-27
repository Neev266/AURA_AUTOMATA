import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JourneyMilestone } from '@/types';

interface TreasureChestProps {
  milestone: JourneyMilestone;
  isUnlocked: boolean;
  currentActivities: number;
  className?: string;
}

export default function TreasureChest({
  milestone,
  isUnlocked,
  currentActivities,
  className,
}: TreasureChestProps) {
  const progress = (currentActivities / milestone.required_activities) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('relative', className)}
    >
      <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-amber-50/10 via-card to-amber-50/5 dark:from-amber-900/10 dark:via-card dark:to-amber-900/5">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 p-8">
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              className="relative"
              animate={isUnlocked ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="relative w-48 h-48">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_2a78fc3a-4bac-4a56-90de-59e074ee192e.jpg"
                  alt="Treasure Chest"
                  className={cn(
                    'w-full h-full object-contain rounded-lg transition-all duration-500',
                    isUnlocked ? 'brightness-110 drop-shadow-2xl' : 'brightness-75 grayscale'
                  )}
                />
                
                {isUnlocked ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg"
                  >
                    <Unlock className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                ) : (
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-muted rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}

                {isUnlocked && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-400 rounded-full"
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 8) * 100,
                          y: Math.sin((i * Math.PI * 2) / 8) * 100,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                        style={{ left: '50%', top: '50%' }}
                      />
                    ))}
                  </>
                )}
              </div>
            </motion.div>

            <div className="text-center space-y-3 w-full">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-2xl font-bold text-foreground">{milestone.title}</h3>
                {milestone.reward_badge && (
                  <Badge variant="secondary" className="text-sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {milestone.reward_badge}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                {milestone.description}
              </p>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress to Unlock</span>
                  <span className="font-semibold">
                    {currentActivities} / {milestone.required_activities}
                  </span>
                </div>

                <div className="relative h-3 bg-muted rounded-full overflow-hidden border border-primary/20">
                  <motion.div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      isUnlocked
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600'
                        : 'bg-gradient-to-r from-primary/60 to-primary'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                  {isUnlocked && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </div>

                {isUnlocked ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-primary font-semibold text-lg pt-2"
                  >
                    🎉 Treasure Unlocked!
                  </motion.p>
                ) : (
                  <p className="text-center text-muted-foreground text-xs pt-2">
                    {milestone.required_activities - currentActivities} more activities to unlock
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
