"use server";

import { collection, getDocs, getFirestore } from "firebase/firestore";
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

export default async function GetAllNotes() {
  const querySnapshot = await getDocs(collection(db, "Notes"));
  const Notes: any = [];
  querySnapshot.forEach((doc) => {
    Notes.push(doc.data());
  });

  return Notes;
}
