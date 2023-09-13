"use server";

import { getFirestore, setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";
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

export default async function CanPostNote(noteName: string) {
  const docRef = doc(db, "Notes", noteName);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();
  if (data === undefined) {
    return true;
  }

  return false;
}
