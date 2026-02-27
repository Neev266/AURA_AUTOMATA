import { motion } from "framer-motion";
import { User, Bell, Shield, Palette } from "lucide-react";

const settingSections = [
  { icon: User, title: "Profile", desc: "Manage your personal information and preferences" },
  { icon: Bell, title: "Notifications", desc: "Configure alerts for wellness reminders" },
  { icon: Shield, title: "Privacy", desc: "Control data sharing and camera/mic permissions" },
  { icon: Palette, title: "Appearance", desc: "Customize your AURA interface experience" },
];

const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 space-y-6 overflow-y-auto h-full"
    >
      <div>
        <h1 className="text-2xl font-bold gradient-cyan-lavender mb-1">Settings</h1>
        <p className="text-sm text-caption">Customize your AURA experience</p>
      </div>

      <div className="space-y-3">
        {settingSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:glow-cyan transition-shadow"
          >
            <div className="p-3 rounded-xl bg-muted">
              <section.icon className="w-5 h-5 text-cyan" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="text-xs text-caption">{section.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsPage;
