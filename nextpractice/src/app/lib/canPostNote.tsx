"use server";

import { getFirestore, setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC1xSf41NuZdXi9Ex-gM6LUqvF_PK0u1uI",
  authDomain: "next-practice-f806e.firebaseapp.com",
  projectId: "next-practice-f806e",
  storageBucket: "next-practice-f806e.appspot.com",
  messagingSenderId: "935446946378",
  appId: "1:935446946378:web:772dad7adda9262d23bcb3",
  measurementId: "G-5BTR9RJFC3",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default async function CanPostNote(noteName: string) {
  const docRef = doc(db, "Notes", noteName);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();
  if (data === undefined) {
    return true;
  }

  return false;
}
