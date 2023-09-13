"use server";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

export default async function IsLoggedIn() {
  const docRef = doc(db, "isLoggedIn", "isLoggedIn");
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();
  const tempArr = [data];

  const finalValue = Object.values(tempArr[0]!);

  if (finalValue[0] == false) {
    return false;
  }

  return true;
}
