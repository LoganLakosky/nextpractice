"use client";
import "./notes.css";
import "../../navBar.css";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

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
  const [updatedNotesBody, setUpdatedNotesBody] = useState<string>("");

  useEffect(() => {
    //Get title and body from noteId
    const extractedBodyTempArr = noteId[0].split("%3");
    extractedBodyTempArr.shift();
    const extractedTitle = extractedBodyTempArr[0].split("!");
    extractedTitle.pop();
    setNotesTitle(extractedTitle[1]);
    setNotesBody(extractedBodyTempArr[1]);
  }, []);

  function updateNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setUpdatedNotesBody(e.target.value);
  }

  console.log(updatedNotesBody);

  return (
    <div className="notesPageMainContainer">
      <div className="navBarContainer">
        <div className="navBarLeft">
          <Link href="/">Nathan's Note's</Link>
        </div>
      </div>
      <div className="notesPageMainContentContainer">
        <div className="notesPageMainContent">
          <div className="notesPageTop">
            <h1>{notesTitle}</h1>
          </div>

          <div className="notesPageMainContentCenter">
            <textarea
              defaultValue={notesBody}
              className="noteBody"
              onChange={updateNoteBody}
            ></textarea>
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
