import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const StatsCard = ({ icon: Icon, label, value, change, positive }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-muted">
          <Icon className="w-4 h-4 text-cyan" />
        </div>
        {change && (
          <span className={`text-[11px] font-medium ${positive ? "text-emerald-400" : "text-orange-400"}`}>
            {change}
          </span>
        )}
      </div>
      <p className="stat-number">{value}</p>
      <p className="text-xs text-caption mt-1">{label}</p>
    </motion.div>
  );
};

export default StatsCard;
