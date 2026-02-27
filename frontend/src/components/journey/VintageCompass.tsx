import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface VintageCompassProps {
  progress: number;
  className?: string;
}

export default function VintageCompass({ progress, className }: VintageCompassProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      <Card className="relative overflow-hidden border-2 border-amber-700/30 bg-gradient-to-br from-amber-50/20 to-amber-100/10 dark:from-amber-900/10 dark:to-amber-950/5 p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            <img
              src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4b68a33e-de8e-4118-aae4-19cbecea0472.jpg"
              alt="Vintage Compass"
              className="w-full h-full object-contain drop-shadow-xl"
            />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            >
              <div className="w-16 h-16 border-2 border-primary/30 rounded-full" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-800 dark:text-amber-400">{progress}%</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-serif text-amber-800 dark:text-amber-400 italic">
              Journey Progress
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Navigate your path to wellness
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
