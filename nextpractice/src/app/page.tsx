"use client";

import CenterPage from "./centerPage";
import NavBar from "./navBar";

export default function HomePage() {
  return (
    <div className="homePageMainContainer">
      <NavBar />
      <CenterPage />
    </div>
  );
}
