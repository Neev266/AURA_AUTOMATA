import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WindingPathProps {
  className?: string;
}

export default function WindingPath({ className }: WindingPathProps) {
  return (
    <div className={cn('relative w-full h-32 overflow-hidden', className)}>
      <svg
        viewBox="0 0 400 120"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M 0,60 Q 100,20 200,60 T 400,60"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        <motion.circle
          r="6"
          fill="hsl(var(--primary))"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M 0,60 Q 100,20 200,60 T 400,60"
          />
        </motion.circle>

        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={i * 100}
            cy={60 + (i % 2 === 0 ? -40 : 0)}
            r="4"
            fill="hsl(var(--primary))"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
    </div>
  );
}
