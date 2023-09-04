import { useState, ChangeEvent, useEffect, Suspense } from "react";
import MainContent from "./mainContent";
import { Timeout } from "./lib/timeout";
import GetAllNotes from "./lib/firebaseHelperLibs/getAllNotes";
import PostNote from "./lib/firebaseHelperLibs/postNote";
import CanPostNote from "./lib/firebaseHelperLibs/canPostNote";

export type NoteType = {
  title: string;
  body?: string;
};

export default function CenterPage() {
  const [noteTitleValue, setNoteTitleValue] = useState<string>("");
  const [noteBodyValue, setNoteBodyValue] = useState<string>("");
  const [leftNotesArr, setLeftNotesArr] = useState<NoteType[]>([]);
  const [rightNotesArr, setRightNotesArr] = useState<NoteType[]>([]);

  //Error states
  const [noteTitleError, setNoteTitleError] = useState<boolean>(false);
  const [noteBodyError, setNoteBodyError] = useState<boolean>(false);
  const [maxNotesReachedErr, setMaxNotesReachedErr] = useState<boolean>(false);
  const [noteTitleBangError, setNoteTitleBangError] = useState<boolean>(false);
  const [noteBodyBangError, setNoteBodyBangError] = useState<boolean>(false);

  useEffect(() => {
    async function getNote() {
      const notes = await GetAllNotes();
      const leftSideNotes: NoteType[] = [];

      for (let i = 0; i < 3; i++) {
        if (notes[i] == undefined) break;
        leftSideNotes.push(notes[i]);
      }

      setLeftNotesArr(leftSideNotes);

      if (notes.length > 3) {
        const rightSideNotes: NoteType[] = [];

        for (let j = 3; j < 6; j++) {
          if (notes[j] == undefined) break;
          rightSideNotes.push(notes[j]);
        }

        setRightNotesArr(rightSideNotes);
      }
    }

    getNote();
  }, []);

  function clearInputs() {
    setNoteTitleValue("");
    setNoteBodyValue("");
  }

  function updateNoteTitleValue(e: ChangeEvent<HTMLInputElement>) {
    setNoteTitleValue(e.target.value);
  }

  function updateNoteBodyValue(e: ChangeEvent<HTMLInputElement>) {
    setNoteBodyValue(e.target.value);
  }

  async function createNote() {
    if (noteTitleValue === "") {
      Timeout(setNoteTitleError, 1200);
      setNoteTitleError(true);
      return;
    }

    if (noteBodyValue === "") {
      Timeout(setNoteBodyError, 1200);
      setNoteBodyError(true);
      return;
    }

    if (noteTitleValue.includes("!")) {
      Timeout(setNoteTitleBangError, 1200);

      setNoteTitleBangError(true);
      return;
    }

    if (noteBodyValue.includes("!")) {
      Timeout(setNoteBodyBangError, 1200);

      setNoteBodyBangError(true);
      return;
    }

    if ((await CanPostNote(noteTitleValue)) == false) {
      //ADD A ERROR PLEASE
      console.log("bad");
      return;
    }

    const newNote: NoteType = {
      title: noteTitleValue,
      body: noteBodyValue,
    };

    if (rightNotesArr.length === 3) {
      Timeout(setMaxNotesReachedErr, 1200);
      setMaxNotesReachedErr(true);
      clearInputs();
    }

    if (leftNotesArr.length === 3) {
      clearInputs();
      setRightNotesArr((prev) => [...prev, newNote]);
    }

    clearInputs();

    PostNote(noteTitleValue, noteBodyValue);
    
    setLeftNotesArr((prev) => [...prev, newNote]);
  }

  return (
    <div className="centerPageContainer">
      <div className="centerPageTopContainer">
        {!maxNotesReachedErr ? (
          <div className="centerPageTop">
            <div className="noteTitleContainer">
              {noteTitleBangError && (
                <label htmlFor="note-title">You cannot use a ! inside a note title</label>
              )}

              {!noteTitleError && <label htmlFor="note-title">Title</label>}
              {noteTitleError && (
                <label htmlFor="note-title" style={{ color: "red", fontSize: "14px" }}>
                  Note Title cannot be empty
                </label>
              )}
              <input
                value={noteTitleValue}
                type="text"
                id="note-title"
                onChange={updateNoteTitleValue}
              />
            </div>
            <div className="noteBodyInputContainer">
              {noteBodyBangError && (
                <label htmlFor="note-body">You cannot use a ! inside a note body</label>
              )}

              {!noteBodyError && <label htmlFor="note-body">Body</label>}
              {noteBodyError && (
                <label htmlFor="note-body" style={{ color: "red", fontSize: "14px" }}>
                  Note Body cannot be empty
                </label>
              )}

              <input
                value={noteBodyValue}
                type="text"
                id="note-body"
                onChange={updateNoteBodyValue}
              />
            </div>

            <div className="noteCreateBtnContainer">
              <button onClick={() => createNote()}>Create Note</button>
            </div>
          </div>
        ) : (
          <h1 style={{ color: "Red" }}>Max notes reached</h1>
        )}
      </div>
      <div className="mainContentContainer">
        <Suspense fallback={<Loading />}>
          <MainContent leftSideNotes={leftNotesArr} rightSideNotes={rightNotesArr} />
        </Suspense>
      </div>
    </div>
  );
}

function Loading() {
  return <h2> Loading...</h2>;
}
