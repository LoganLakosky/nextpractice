"use client";
import "./notes.css";
import "../../navBar.css";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

type Params = {
  params: {
    noteId: string;
  };
};

const firebaseConfig = {
  apiKey: "AIzaSyC1xSf41NuZdXi9Ex-gM6LUqvF_PK0u1uI",
  authDomain: "next-practice-f806e.firebaseapp.com",
  projectId: "next-practice-f806e",
  storageBucket: "next-practice-f806e.appspot.com",
  messagingSenderId: "935446946378",
  appId: "1:935446946378:web:772dad7adda9262d23bcb3",
  measurementId: "G-5BTR9RJFC3",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

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
    console.log(extractedBodyTempArr)
    setNotesBody(extractedBodyTempArr[1]);
  }, []);

  function updateNoteBody(e: ChangeEvent<HTMLTextAreaElement>) {
    setUpdatedNotesBody(e.target.value);
  }

  function saveNote() {}

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
            <button onClick={() => saveNote()}>Save Note</button>
            <button onClick={() => deleteNote()}>Delete Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}
