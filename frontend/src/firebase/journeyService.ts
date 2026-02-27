import { db } from "@/firebase"; // your existing firebase config
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export async function getUserJourneyProgress(userId: string) {
  const snap = await getDoc(doc(db, "journey_progress", userId));
  return snap.exists() ? snap.data() : null;
}

export async function getAllChapters() {
  const snapshot = await getDocs(collection(db, "journey_chapters"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}