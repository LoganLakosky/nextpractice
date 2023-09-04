"use client";
import "./notes.css";
import "../../navBar.css";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import IsLoggedIn from "@/app/lib/isLoggedIn";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  async function getLoggedInStatus() {
    const isLoggedInTmp = await IsLoggedIn();
    setIsLoggedIn(isLoggedInTmp);
  }

  useEffect(() => {
    getLoggedInStatus();

    //Get title and body from noteId
    const extractedBodyTempArr = noteId[0].split("!");
    const noteTitleTmp = extractedBodyTempArr[1];
    const noteBodyTmp = extractedBodyTempArr[3];

    setNotesTitle(noteTitleTmp);
    setNotesBody(noteBodyTmp);
    console.log(extractedBodyTempArr);
  }, []);

  function updateNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setUpdatedNotesBody(e.target.value);
  }

  function saveNoteDetails() {




  }

  return (
    <div className="notesPageMainContainer">
      <div className="navBarContainer">
        <div className="navBarLeft">
          <Link href="/">Nathan's Note's</Link>
        </div>
        <div className="navBarRight">
          {isLoggedIn && <Link href="/login">Login</Link>}
          {isLoggedIn && <Link href="/signup">Signup</Link>}
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
            <button onClick={() => saveNoteDetails()}>Save Note</button>
            <button onClick={() => deleteNote()}>Delete Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}
