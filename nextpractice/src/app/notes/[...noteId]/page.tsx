"use client";
import "./notes.css";
import "../../navBar.css";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import IsLoggedIn from "@/app/lib/firebaseHelperLibs/isLoggedIn";
import DeleteNote from "@/app/lib/firebaseHelperLibs/deleteNote";
import UpdateNote from "@/app/lib/firebaseHelperLibs/updateNote";
import GetNote from "@/app/lib/firebaseHelperLibs/getNote";

type Params = {
  params: {
    noteId: string;
  };
};

//Helper functions
function takeUserBack() {
  window.location.href = "/";
}

export default function Note({ params: { noteId } }: Params) {
  const [notesTitle, setNotesTitle] = useState<string>("");
  const [notesBody, setNotesBody] = useState<string>("");
  const [updatedNotesBody, setUpdatedNotesBody] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getLoggedInStatus() {
    const isLoggedInTmp = await IsLoggedIn();
    setIsLoggedIn(isLoggedInTmp);
  }

  useEffect(() => {
    getLoggedInStatus();

    const extractedBodyTempArr = noteId[0].split("!");
    const noteTitleTmp = extractedBodyTempArr[1];

    async function getCurrentNote() {
      const currNote = await GetNote(noteTitleTmp);
      setNotesBody(currNote!.body);
      setIsLoading(false);
    }

    getCurrentNote();

    //Get title and body from noteId

    setNotesTitle(noteTitleTmp);
  }, []);

  function updateNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setUpdatedNotesBody(e.target.value);
  }

  function saveNoteDetails() {
    console.log(notesTitle);
    UpdateNote(notesTitle, updatedNotesBody);
  }

  function deleteNote() {
    DeleteNote(notesTitle);
    window.location.href = "/";
  }

  return (
    <div className="notesPageMainContainer">
      <div className="navBarContainer">
        <div className="navBarLeft">
          <Link href="/">Nathans Notes</Link>
        </div>
        <div className="navBarRight">
          {isLoggedIn && <Link href="/login">Login</Link>}
          {isLoggedIn && <Link href="/signup">Signup</Link>}
        </div>
      </div>
      <div className="notesPageMainContentContainer">
        <div className="notesPageMainContent">
          <div className="notesPageTop">
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && <h1>{notesTitle}</h1>}
          </div>

          <div className="notesPageMainContentCenter">
            {isLoading && <textarea defaultValue="Loading..." className="noteBody"></textarea>}
            {!isLoading && (
              <textarea
                defaultValue={notesBody}
                className="noteBody"
                onChange={updateNoteBody}
              ></textarea>
            )}
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
