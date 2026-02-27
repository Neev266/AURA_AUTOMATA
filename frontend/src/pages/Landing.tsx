import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Smile, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Mic, 
  Camera,
  ArrowRight,
  Star,
  Zap
} from "lucide-react";

const FloatingShape = ({ color, size, top, left, delay }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      delay, 
      ease: "easeInOut" 
    }}
    className="absolute pointer-events-none blur-3xl opacity-40"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
      borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
    }}
  />
);

const FeatureCard = ({ icon: Icon, title, desc, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    whileHover={{ y: -10 }}
    className={`p-8 rounded-[2.5rem] shadow-sm border border-white/20 h-full flex flex-col items-start transition-shadow hover:shadow-xl ${color}`}
  >
    <div className="w-14 h-14 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-sm">
      <Icon className="text-gray-700" size={28} />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-700/80 leading-relaxed font-medium">{desc}</p>
    <div className="mt-auto pt-6">
      <motion.div 
        whileHover={{ x: 5 }}
        className="flex items-center gap-2 text-sm font-bold text-gray-800 cursor-pointer"
      >
        Explore <ArrowRight size={16} />
      </motion.div>
    </div>
  </motion.div>
);

const Landing = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3ECE6] text-gray-800 font-sans selection:bg-[#D5D2FD]">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-48 pb-32 px-6 overflow-hidden">
        <FloatingShape color="#F8E0C2" size="400px" top="-100px" left="-100px" delay={0} />
        <FloatingShape color="#D5D2FD" size="300px" top="20%" left="80%" delay={1} />
        <FloatingShape color="#F5D6FF" size="250px" top="60%" left="10%" delay={2} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-white/50 mb-8"
          >
            <Sparkles size={16} className="text-[#F8E0C2]" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">
              Your AI Wellness Companion
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-gray-900 mb-8"
          >
            Feel heard. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0C7C3] via-[#D5D2FD] to-[#F8E0C2]">
              Feel human.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            AURA uses emotionally intelligent AI to understand your mood and guide you toward a calmer, brighter mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto bg-[#F8E0C2] text-gray-800 px-10 py-5 rounded-[2rem] font-black text-lg shadow-lg hover:shadow-xl hover:bg-[#f3d0a6] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight size={20} />
            </button>

            <button className="w-full sm:w-auto bg-white/60 backdrop-blur-md text-gray-700 px-10 py-5 rounded-[2rem] font-bold text-lg border border-white shadow-sm hover:bg-white transition-all active:scale-95">
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* (Your Hero Illustration Section remains untouched here) */}
      </section>

      {/* Features Section (UNCHANGED — NOT REMOVED) */}
      <section className="py-32 px-6 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Support that grows with you
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Our multimodal AI analyzes micro-expressions, tone of voice, and language patterns to offer truly personalized wellness tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={Camera} title="Expression Sync" desc="Real-time facial analysis to detect stress before you even feel it." color="bg-[#D5D2FD]" delay={0.1} />
            <FeatureCard icon={Mic} title="Voice Harmony" desc="Deep vocal insights that track emotional shifts in your natural speech." color="bg-[#F0C7C3]" delay={0.2} />
            <FeatureCard icon={MessageCircle} title="Kind Chat" desc="The most empathetic text AI ever built, available 24 hours a day." color="bg-[#F5D6FF]" delay={0.3} />
            <FeatureCard icon={Wind} title="Breath Focus" desc="Smart breathing exercises that adapt to your immediate heart rate." color="bg-[#F8E0C2]" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            Join the gentle revolution.
          </h2>

          <button
            onClick={() => navigate("/login")}
            className="bg-gray-900 text-white px-12 py-6 rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
          >
            Start Your 14-Day Free Trial
            <Zap size={20} className="text-[#FCE8B3]" fill="#FCE8B3" />
          </button>

          <p className="mt-8 text-gray-500 font-bold">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Landing;