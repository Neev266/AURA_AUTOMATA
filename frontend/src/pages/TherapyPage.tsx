import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Clock,
  Star,
} from "lucide-react";

/* ===== CHANGE IMAGES HERE ONLY ===== */
import emily from "@/assets/therapists/virti.png";
import michael from "@/assets/therapists/ved.png";
import sarah from "@/assets/therapists/modi.png";
/* =================================== */

interface TherapySession {
  id: string;
  therapist_name: string;
  therapist_specialty: string;
  session_date: string;
  duration_minutes: number;
  session_type: string;
  status: string;
}

const therapists = [
  {
    id: 1,
    name: "Dr. Virti Panchamia",
    specialty: "Cognitive Behavioral Therapy",
    avatar: emily,
    rating: 4.9,
    experience: "12 years",
    description:
      "Specializes in anxiety, depression, and stress management",
    availability: "Available today",
  },
  {
    id: 2,
    name: "Dr. Ved Mehta",
    specialty: "Mindfulness-Based Therapy",
    avatar: michael,
    rating: 4.8,
    experience: "10 years",
    description:
      "Expert in mindfulness, meditation, and emotional regulation",
    availability: "Available tomorrow",
  },
  {
    id: 3,
    name: "Dr. Narendra Modi",
    specialty: "Trauma & PTSD",
    avatar: sarah,
    rating: 5.0,
    experience: "15 years",
    description:
      "Compassionate care for trauma recovery and PTSD",
    availability: "Available this week",
  },
];

export default function TherapyPage() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<TherapySession[]>([]);

  function formatSessionDate(dateStr: string) {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  const sessionTypeIcons: Record<string, any> = {
    video: Video,
    audio: Phone,
    chat: MessageCircle,
    "in-person": Calendar,
  };

  function handleBookSession(therapist: any) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(18, 0, 0);

    const newSession: TherapySession = {
      id: crypto.randomUUID(),
      therapist_name: therapist.name,
      therapist_specialty: therapist.specialty,
      session_date: date.toISOString(),
      duration_minutes: 60,
      session_type: "video",
      status: "scheduled",
    };

    setSessions((prev) => [...prev, newSession]);

    toast({
      title: "Session Booked 🎉",
      description: `Your session with ${therapist.name} has been scheduled.`,
    });
  }

  return (
    <div className="p-6 lg:p-10 space-y-10 overflow-y-auto h-full">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold gradient-cyan-lavender">
          Professional Therapy
        </h1>
        <p className="text-sm text-caption">
          Connect with licensed therapists for personalized support
        </p>
      </div>

      {/* Upcoming Sessions */}
      {sessions.length > 0 && (
        <Card className="glass border border-border rounded-3xl">
          <CardHeader>
            <CardTitle className="text-heading">
              Your Upcoming Sessions
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {sessions.map((session) => {
              const { date, time } = formatSessionDate(
                session.session_date
              );
              const Icon =
                sessionTypeIcons[session.session_type] || Video;

              const therapistAvatar =
                therapists.find(
                  (t) => t.name === session.therapist_name
                )?.avatar;

              return (
                <div
                  key={session.id}
                  className="p-5 bg-card border border-border rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                      <img
                        src={therapistAvatar}
                        alt={session.therapist_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-heading">
                        {session.therapist_name}
                      </h3>

                      <p className="text-sm text-caption">
                        {session.therapist_specialty}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-sm text-caption">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {date}
                        </div>

                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {time}
                        </div>

                        <div className="flex items-center gap-1 capitalize">
                          <Icon className="w-3 h-3" />
                          {session.session_type}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="rounded-xl bg-primary text-primary-foreground hover:opacity-90">
                    Join Session
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Find Therapist */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-heading">
          Find Your Therapist
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
            <Card
              key={therapist.id}
              className="glass border border-border rounded-3xl hover:shadow-xl transition"
            >
              <CardContent className="p-6 space-y-4">

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-md shrink-0">
                    <img
                      src={therapist.avatar}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-heading">
                      {therapist.name}
                    </h3>

                    <p className="text-sm text-caption">
                      {therapist.specialty}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-sm font-medium text-heading">
                        {therapist.rating}
                      </span>
                      <span className="text-xs text-caption">
                        • {therapist.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-caption">
                  {therapist.description}
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-primary font-medium">
                    {therapist.availability}
                  </span>
                </div>

                <Button
                  onClick={() => handleBookSession(therapist)}
                  className="w-full rounded-2xl bg-primary text-primary-foreground hover:opacity-90"
                >
                  Book Session
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Restored */}
      <Card className="glass border border-border rounded-3xl">
        <CardHeader>
          <CardTitle className="text-heading">
            Why Professional Therapy?
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl">🎯</div>
              <h3 className="font-semibold text-heading">
                Expert Guidance
              </h3>
              <p className="text-sm text-caption">
                Work with licensed professionals who understand your needs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-4xl">🔒</div>
              <h3 className="font-semibold text-heading">
                Confidential & Safe
              </h3>
              <p className="text-sm text-caption">
                Secure, encrypted sessions with complete privacy.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-4xl">📈</div>
              <h3 className="font-semibold text-heading">
                Proven Results
              </h3>
              <p className="text-sm text-caption">
                Evidence-based approaches that create lasting change.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}