import Link from "next/link";
import { TodoType } from "./centerPage";

type MainContentProps = {
  leftSideTodos: TodoType[];
  rightSideTodos: TodoType[];
};

export default function MainContent({ leftSideTodos, rightSideTodos }: MainContentProps) {
  return (
    <>
      <div className="mainContentLeft">
        {leftSideTodos.map((todo, idx) => {
          return (
            <div className="leftSideTodos" key={idx}>
              <div className="leftSideTodosTop">
                <h2>{todo.title}</h2>
              </div>

              <Link href={`/todos/${idx}`} className="goToTodoBtn"></Link>
            </div>
          );
        })}
      </div>
      <div className="mainContentRight">
        {rightSideTodos.map((todo, idx) => {
          return (
            <div className="rightSideTodos" key={idx}>
              <div className="rightSideTodosTop">
                <h2>{todo.title}</h2>
              </div>

              <Link href={`/todos/${idx}`} className="goToTodoBtn"></Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
