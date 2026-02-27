// Emotion → Feature recommendations mapping
export const emotionRecommendations: Record<string, { features: string[]; message: string }> = {
  sad: {
    features: ["breathing", "therapy", "talk_to_friend"],
    message: "Based on how you're feeling, try these wellness features:",
  },
  angry: {
    features: ["breathing", "stress_relief_game", "therapy"],
    message: "Let's help you calm down with these tools:",
  },
  fear: {
    features: ["breathing", "meditation", "therapy"],
    message: "These features might help ease your anxiety:",
  },
  disgust: {
    features: ["breathing", "games", "nearby_events"],
    message: "Try shifting your mood with:",
  },
  happy: {
    features: ["games", "nearby_events", "talk_to_friend"],
    message: "Great energy! Enhance your day with:",
  },
  surprise: {
    features: ["games", "nearby_events"],
    message: "Channel this energy into:",
  },
  neutral: {
    features: ["breathing", "games", "meditation"],
    message: "Explore wellness features to boost your day:",
  },
};

export const featureEmojis: Record<string, string> = {
  breathing: "🫁",
  meditation: "🧘",
  therapy: "💬",
  games: "🎮",
  stress_relief_game: "🎯",
  talk_to_friend: "👫",
  nearby_events: "📍",
};

export const featureLabels: Record<string, string> = {
  breathing: "Breathing Exercise",
  meditation: "Meditation",
  therapy: "Therapy Session",
  games: "Wellness Games",
  stress_relief_game: "Stress Relief Game",
  talk_to_friend: "Talk to a Friend",
  nearby_events: "Nearby Events",
};

// Feature → App route mapping
export const featureRoutes: Record<string, string> = {
  breathing: "/app/recommendations",
  meditation: "/app/recommendations",
  therapy: "/app/therapy",
  games: "/app/games",
  stress_relief_game: "/app/games",
  talk_to_friend: "/app/chat",
  nearby_events: "/app/calendar",
};

export function getRecommendationsByEmotion(emotion: string) {
  const normalized = emotion.toLowerCase();
  return emotionRecommendations[normalized] || emotionRecommendations.neutral;
}

export function getRouteForFeature(feature: string): string {
  return featureRoutes[feature] || "/app";
}
