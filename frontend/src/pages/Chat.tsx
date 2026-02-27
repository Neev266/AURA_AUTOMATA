import { motion } from "framer-motion";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold gradient-cyan-lavender mb-1">Chat with AURA</h1>
        <p className="text-sm text-caption">Your AI companion is here to listen and support you</p>
      </div>
      <div className="flex-1 min-h-0">
        <ChatInterface />
      </div>
    </motion.div>
  );
};

export default Chat;
