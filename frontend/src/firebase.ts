// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG1pu43-RMMa33MG4YR72PUhfJE3ow5Q0",
  authDomain: "aura-93c45.firebaseapp.com",
  projectId: "aura-93c45",
  storageBucket: "aura-93c45.firebasestorage.app",
  messagingSenderId: "1059125421737",
  appId: "1:1059125421737:web:363ba7a574fc67264b6bb8",
};

const app = initializeApp(firebaseConfig);

// ✅ MUST export these
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;