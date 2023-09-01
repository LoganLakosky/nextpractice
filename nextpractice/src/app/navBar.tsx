"use client";
import { useEffect, useState } from "react";
import "./navBar.css";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const firebaseConfig = {
    apiKey: "AIzaSyC1xSf41NuZdXi9Ex-gM6LUqvF_PK0u1uI",
    authDomain: "next-practice-f806e.firebaseapp.com",
    projectId: "next-practice-f806e",
    storageBucket: "next-practice-f806e.appspot.com",
    messagingSenderId: "935446946378",
    appId: "1:935446946378:web:772dad7adda9262d23bcb3",
    measurementId: "G-5BTR9RJFC3",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    async function checkIfLoggedIn() {
      const docRef = doc(db, "isLoggedIn", "isLoggedIn");
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();
      const tempArr = [data];

      const finalValue = Object.values(tempArr[0]!);

      if (finalValue[0] == false) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      return;
    }

    checkIfLoggedIn();
  }, []);

  return (
    <>
      <div className="navBarContainer">
        <div className="navBarLeft">
          <h1>Tod's Todo's</h1>
        </div>
        <div className="navBarRight">
          {!isLoggedIn && <Link href="/login">Login</Link>}
          {!isLoggedIn && <Link href="/signup">Signup</Link>}
        </div>
      </div>
    </>
  );
}
