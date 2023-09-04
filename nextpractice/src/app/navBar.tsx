"use client";
import "./navBar.css";
import Link from "next/link";
import IsLoggedIn from "./lib/firebaseHelperLibs/isLoggedIn";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  async function getLoggedInStatus() {
    const isLoggedInTmp = await IsLoggedIn();
    setIsLoggedIn(isLoggedInTmp);
  }

  useEffect(() => {
    getLoggedInStatus();
  }, []);

  return (
    <>
      <div className="navBarContainer">
        <div className="navBarLeft">
          <Link href="/">Nathan's Note's</Link>
        </div>
        <div className="navBarRight">
          {isLoggedIn && <Link href="/login">Login</Link>}
          {isLoggedIn && <Link href="/signup">Signup</Link>}
        </div>
      </div>
    </>
  );
}
