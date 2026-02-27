import { useState, useEffect } from "react";
import IllustratedChapterScene from "@/components/journey/IllustratedChapterScene";
import VintageBookPage from "@/components/journey/VintageBookPage";
import VintageCompass from "@/components/journey/VintageCompass";
import VintageScrollDivider from "@/components/journey/VintageScrollDivider";
import StoryModal from "@/components/journey/StoryModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  getUserJourneyProgress,
  getAllChapters,
} from "@/firebase/journeyService";

/* ================= TOGGLE ================= */
const USE_DUMMY_DATA = true;

/* ================= TYPES ================= */
interface StoryChapter {
  id: string;
  chapter_number: number;
  title: string;
  description: string;
}

/* ================= IMAGES ================= */
const chapterImages: Record<number, string> = {
  1: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ec657e7b-12e8-4de9-8af1-2583bf9d3dd8.jpg",
  2: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_e8cc66fa-b9bc-45e2-ac36-3561effb7fd9.jpg",
  3: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_4c7e5e9e-be44-4bec-b8ef-63f9633bda20.jpg",
  4: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_b2538f35-478d-4051-955f-b101ff85c19a.jpg",
};

/* ================= COMPONENT ================= */
export default function JourneyPage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [progress, setProgress] = useState(0);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] =
    useState<StoryChapter | null>(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
  if (USE_DUMMY_DATA) {
    loadData();
    return;
  }

  if (!user) return;
  loadData();
}, [user]);

  const loadData = async () => {
    setLoading(true);

    try {
      /* ================= DUMMY MODE ================= */
      if (USE_DUMMY_DATA) {
        setProgress(65);
        setWellnessScore(78);
        setTotalActivities(14);

        setChapters([
          {
            id: "1",
            chapter_number: 1,
            title: "The Beginning",
            description:
              "You begin your wellness journey, discovering new habits and awareness.",
          },
          {
            id: "2",
            chapter_number: 2,
            title: "Rising Strength",
            description:
              "With consistency, your mental resilience grows stronger each day.",
          },
          {
            id: "3",
            chapter_number: 3,
            title: "Inner Balance",
            description:
              "You now navigate life with clarity, balance, and emotional stability.",
          },
        ]);

        setLoading(false);
        return;
      }

      /* ================= FIREBASE MODE ================= */

      const userProgress = await getUserJourneyProgress(user.uid);

      if (userProgress) {
        setProgress(userProgress.overall_progress || 0);
        setWellnessScore(userProgress.wellness_score || 0);
        setTotalActivities(userProgress.total_activities || 0);
      }

      const rawChapters = await getAllChapters();

      const formattedChapters: StoryChapter[] = rawChapters.map(
        (doc: any) => ({
          id: doc.id,
          chapter_number: doc.chapter_number,
          title: doc.title,
          description: doc.description,
        })
      );

      setChapters(formattedChapters);
    } catch (error) {
      console.error("Error loading journey:", error);
    }

    setLoading(false);
  };

  /* ================= MODAL ================= */
  const handleReadStory = (chapter: StoryChapter) => {
    setSelectedChapter(chapter);
    setStoryModalOpen(true);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <Skeleton className="h-64 w-full bg-muted" />
        <Skeleton className="h-96 w-full bg-muted" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto pb-16 px-6 space-y-12">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl font-bold gradient-cyan-lavender">
          Your Wellness Journey
        </h1>
        <p className="text-caption">
          Track your growth and unlock new chapters.
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-8">
        <VintageCompass progress={progress} />

        <VintageBookPage>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-heading">
              Journey Statistics
            </h3>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-sm text-caption">Wellness</p>
                <p className="text-3xl font-bold text-primary">
                  {wellnessScore}%
                </p>
              </div>

              <div>
                <p className="text-sm text-caption">Activities</p>
                <p className="text-3xl font-bold text-heading">
                  {totalActivities}
                </p>
              </div>
            </div>
          </div>
        </VintageBookPage>
      </div>

      <VintageScrollDivider />

      {/* CHAPTERS */}
      <div className="space-y-14">
        {chapters.map((chapter, index) => (
          <div key={chapter.id}>
            <VintageBookPage pageNumber={index + 1}>
              <IllustratedChapterScene
                chapter={chapter}
                narrative={chapter.description}
                imageUrl={chapterImages[chapter.chapter_number] || ""}
                moodIcon="🧭"
                userName={user?.displayName || "Explorer"}
                wellnessScore={wellnessScore}
                onPlayNarration={() => {}}
              />
            </VintageBookPage>

            {index < chapters.length - 1 && (
              <>
                <VintageScrollDivider />

                <div className="flex justify-center my-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadStory(chapter)}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Full Chronicle
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      <StoryModal
        chapter={selectedChapter}
        open={storyModalOpen}
        onOpenChange={setStoryModalOpen}
      />
    </div>
  );
}