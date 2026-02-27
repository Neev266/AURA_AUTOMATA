// Signup.tsx

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const FloatingShape = ({ color, size, top, left, delay }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [0, -25, 0],
      rotate: [0, 6, -6, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="absolute blur-3xl opacity-40 -z-10"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
      borderRadius: "50%",
    }}
  />
);

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isStrong = password.length >= 8 && /[0-9]/.test(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/app");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F3ECE6] px-6 overflow-hidden">

      {/* Floating pastel blobs */}
      <FloatingShape color="#F8E0C2" size="350px" top="-120px" left="-120px" delay={0} />
      <FloatingShape color="#D5D2FD" size="300px" top="60%" left="85%" delay={1} />
      <FloatingShape color="#F5D6FF" size="250px" top="40%" left="-100px" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-10 md:p-12 shadow-xl border border-white/60">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#F0C7C3] to-[#D5D2FD] flex items-center justify-center shadow-md mb-6">
              <Sparkles className="text-white w-8 h-8" />
            </div>

            <h1 className="text-3xl font-black text-gray-900">
              Join AURA
            </h1>
            <p className="text-gray-600 mt-2 text-sm font-medium">
              Start your journey toward emotional clarity.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-6">

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-100 text-red-500 text-sm p-3 rounded-2xl text-center font-semibold"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D5D2FD] text-gray-800 placeholder-gray-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Create Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F0C7C3] text-gray-800 placeholder-gray-400 transition"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F5D6FF] text-gray-800 placeholder-gray-400 transition"
              />
            </div>

            {/* Strength Indicator */}
            {password && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className={`h-1.5 flex-1 rounded-full transition-all ${isStrong ? "bg-[#F0C7C3]" : "bg-gray-200"}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${isStrong ? "bg-[#D5D2FD]" : "bg-gray-200"}`} />
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-2">
                  {isStrong ? "Strong" : "Weak"}
                </span>
              </motion.div>
            )}

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#F8E0C2] to-[#F0C7C3] rounded-2xl font-black text-gray-900 shadow-md flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Sanctuary Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#C060B0] font-bold hover:underline"
              >
                Log In
              </Link>
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} /> HIPAA Compliant
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} /> Encrypted AI
              </span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Signup;