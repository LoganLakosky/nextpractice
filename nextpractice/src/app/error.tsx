"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  /*
    display: Flex;
  justify-content: center;
  align-items: center;
  width: 9%;
  height: 50%;
  border-radius: 6px;
  background-color: dimgray;
  */
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      <h2>Something went wrong!</h2>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100px",
          height: "50px",
          borderRadius: "6px",
          backgroundColor: "dimgray",
        }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
