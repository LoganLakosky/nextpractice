import { useState, ChangeEvent } from "react";
import MainContent from "./mainContent";
import { Timeout } from "./lib/timeout";

export type TodoType = {
  title: string;
  body?: string;
};

export default function CenterPage() {
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoBodyValue, setTodoBodyValue] = useState<string>("");
  const [leftTodosArr, setLeftTodosArr] = useState<TodoType[]>([]);
  const [rightTodosArr, setRightTodosArr] = useState<TodoType[]>([]);

  //Error states
  const [todoTitleError, setTodoTitleError] = useState<boolean>(false);
  const [todoBodyError, setTodoBodyError] = useState<boolean>(false);
  const [maxTodosReachedErr, setMaxTodosReachedErr] = useState<boolean>(false);

  function clearInputs() {
    setTodoTitleValue("");
    setTodoBodyValue("");
  }

  function updateTodoTitleValue(e: ChangeEvent<HTMLInputElement>) {
    setTodoTitleValue(e.target.value);
  }

  function updateTodoBodyValue(e: ChangeEvent<HTMLInputElement>) {
    setTodoBodyValue(e.target.value);
  }

  function createTodo() {
    if (todoTitleValue === "") {
      Timeout(setTodoTitleError, 1200);
      setTodoTitleError(true);
      return;
    }

    if (todoBodyValue === "") {
      Timeout(setTodoBodyError, 1200);
      setTodoBodyError(true);
      return;
    }

    const newTodo: TodoType = {
      title: todoTitleValue,
      body: todoBodyValue,
    };

    if (rightTodosArr.length === 3) {
      Timeout(setMaxTodosReachedErr, 1200);
      setMaxTodosReachedErr(true);
      clearInputs();
      return;
    }

    if (leftTodosArr.length === 3) {
      clearInputs();
      setRightTodosArr((prev) => [...prev, newTodo]);
      return;
    }

    clearInputs();

    setLeftTodosArr((prev) => [...prev, newTodo]);
  }

  return (
    <div className="centerPageContainer">
      <div className="centerPageTopContainer">
        {!maxTodosReachedErr ? (
          <div className="centerPageTop">
            <div className="todoTitleContainer">
              {!todoTitleError && <label htmlFor="todo-title">Title</label>}
              {todoTitleError && (
                <label htmlFor="todo-title" style={{ color: "red", fontSize: "14px" }}>
                  Todo Title cannot be empty
                </label>
              )}
              <input
                value={todoTitleValue}
                type="text"
                id="todo-title"
                onChange={updateTodoTitleValue}
              />
            </div>
            <div className="todoBodyInputContainer">
              {!todoBodyError && <label htmlFor="todo-body">Body</label>}
              {todoBodyError && (
                <label htmlFor="todo-body" style={{ color: "red", fontSize: "14px" }}>
                  Todo Body cannot be empty
                </label>
              )}

              <input
                value={todoBodyValue}
                type="text"
                id="todo-body"
                onChange={updateTodoBodyValue}
              />
            </div>

            <div className="todoCreateBtnContainer">
              <button onClick={() => createTodo()}>Create Todo</button>
            </div>
          </div>
        ) : (
          <h1 style={{ color: "Red" }}>Max todos reached</h1>
        )}
      </div>
      <div className="mainContentContainer">
        <MainContent leftSideTodos={leftTodosArr} rightSideTodos={rightTodosArr} />
      </div>
    </div>
  );
}
