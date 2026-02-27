import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider, useAuth } from "@/context/AuthContext";

import AppSidebar from "@/components/AppSidebar";

/* ====== PAGES ====== */
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Analytics from "./pages/Analytics";
import Recommendations from "./pages/Recommendations";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Calendar from "./pages/Calendar";
import GamesPage from "./pages/GamesPage";
import TherapyPage from "./pages/TherapyPage";
import Journey from "./pages/Journey";

import BreathingGame from "./pages/games/BreathingGame";
import MemoryGame from "./pages/games/MemoryGame";
import GratitudeGame from "./pages/games/GratitudeGame";
import MazeGame from "./pages/games/MazeGame";
import ColorGame from "./pages/games/ColorGame";
import ZenGame from "./pages/games/ZenGame";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

/* =========================
   🔒 Protected Route Wrapper
========================= */
const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

/* =========================
   📦 Layout for App Area
========================= */
const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
<main className="flex-1 min-w-0 h-screen overflow-y-auto bg-card">        <Outlet />
      </main>
    </div>
  );
};

/* =========================
   🚀 MAIN APP
========================= */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ===== PROTECTED APP ROUTES ===== */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>

                <Route path="/app" element={<Dashboard />} />
                <Route path="/app/chat" element={<Chat />} />
                <Route path="/app/analytics" element={<Analytics />} />
                <Route path="/app/calendar" element={<Calendar />} />
                <Route path="/app/games" element={<GamesPage />} />

                {/* Game Routes */}
                <Route path="/app/games/breathing" element={<BreathingGame />} />
                <Route path="/app/games/memory" element={<MemoryGame />} />
                <Route path="/app/games/gratitude" element={<GratitudeGame />} />
                <Route path="/app/games/maze" element={<MazeGame />} />
                <Route path="/app/games/color" element={<ColorGame />} />
                <Route path="/app/games/zen" element={<ZenGame />} />

                <Route path="/app/therapy" element={<TherapyPage />} />
                <Route path="/app/journey" element={<Journey />} /> {/* ✅ FIXED */}
                <Route path="/app/recommendations" element={<Recommendations />} />
                <Route path="/app/settings" element={<SettingsPage />} />

              </Route>
            </Route>

            {/* ===== 404 ===== */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;