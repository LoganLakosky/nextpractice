import Link from "next/link";
import { NoteType } from "./centerPage";

type MainContentProps = {
  leftSideNotes: NoteType[];
  rightSideNotes: NoteType[];
};

export default function MainContent({ leftSideNotes, rightSideNotes }: MainContentProps) {
  return (
    <>
      <div className="mainContentLeft">
        {leftSideNotes.map((note, idx) => {
          return (
            <div className="leftSideNotes" key={idx}>
              <div className="leftSideNotesTop">
                <h2>{note.title}</h2>
              </div>

              <Link
                href={`/notes/title=!${note.title}!body=!${[note.body]}`}
                className="goToNote"
              ></Link>
            </div>
          );
        })}
      </div>
      <div className="mainContentRight">
        {rightSideNotes.map((note, idx) => {
          return (
            <div className="rightSideNotes" key={idx}>
              <div className="rightSideNotesTop">
                <h2>{note.title}</h2>
              </div>
              <Link
                href={`/notes/title=!${note.title}!body=!${[note.body]}`}
                className="goToNote"
              ></Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
