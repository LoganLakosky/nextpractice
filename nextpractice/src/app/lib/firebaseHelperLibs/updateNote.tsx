"use server";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default async function UpdateNote(noteName: string, newNoteBody: string) {
  const noteRef = doc(db, "Notes", noteName);

  await updateDoc(noteRef, {
    body: newNoteBody,
  });
}
