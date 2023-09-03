"use client";
import "./notes.css";
import "../../navBar.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type Params = {
  params: {
    noteId: string;
  };
};

//Helper functions
function takeUserBack() {
  window.location.href = "/";
}

function deleteNote() {}

export default function Note({ params: { noteId } }: Params) {
  const [notesTitle, setNotesTitle] = useState<string>("");
  const [notesBody, setNotesBody] = useState<string>("");

  useEffect(() => {
    //Get title and body from noted
    let extractedBodyTempArr = noteId[0].split("%3");
    extractedBodyTempArr.shift();
    let extractedTitle = extractedBodyTempArr[0].split("!");
    extractedTitle.pop();
    setNotesTitle(extractedTitle[0]);
    setNotesBody(extractedBodyTempArr[1]);
  }, []);

  return (
    <div className="notesPageMainContainer">
      <div className="navBarContainer">
        <div className="navBarLeft">
          <Link href="/">Tod's Todo's</Link>
        </div>
      </div>
      <div className="notesPageMainContentContainer">
        <div className="notesPageMainContent">
          <div className="notesPageTop">
            <h1>{notesTitle}</h1>
          </div>

          <div className="notesPageMainContentCenter">
            <textarea className="noteBody">{notesBody}</textarea>
          </div>

          <div className="bottomBtnsContainer">
            <button onClick={() => takeUserBack()}>Back</button>
            <button onClick={() => deleteNote()}>Delete Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}
