import { motion } from 'framer-motion';

interface VintageScrollDividerProps {
  className?: string;
}

export default function VintageScrollDivider({ className }: VintageScrollDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={className}
    >
      <div className="relative flex items-center justify-center py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-amber-700/20 dark:border-amber-600/20" />
        </div>
        
        <div className="relative bg-background px-6">
          <img
            src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_96d2d4ba-11a7-4b7e-875c-02eb7b879b71.jpg"
            alt="Scroll Divider"
            className="h-16 w-auto object-contain opacity-60 dark:opacity-40"
          />
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
