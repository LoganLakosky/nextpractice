import { Red_Hat_Display } from "next/font/google";
import { useState, ChangeEvent } from "react";
import MainContent from "./mainContent";

type TodoType = {
  title: string;
  body?: string;
};

export default function CenterPage() {
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoBodyValue, setTodoBodyValue] = useState<string>("");
  const [todosArr, setTodosArr] = useState<TodoType[]>([]);

  //Error states
  const [todoTitleError, setTodoTitleError] = useState<boolean>(false);
  const [todoBodyError, setTodoBodyError] = useState<boolean>(false);

  function updateTodoTitleValue(e: ChangeEvent<HTMLInputElement>) {
    setTodoTitleValue(e.target.value);
  }

  function updateTodoBodyValue(e: ChangeEvent<HTMLInputElement>) {
    setTodoBodyValue(e.target.value);
  }

  function createTodo() {
    if (todoTitleValue === "") {
      //ADD A BETTER ERROR MSG
      setTimeout(() => {
        setTodoTitleError(false);
      }, 1200);

      setTodoTitleError(true);

      return;
    }

    if (todoBodyValue === "") {
      //ADD A BETTER ERROR MSG
      setTimeout(() => {
        setTodoBodyError(false);
      }, 1200);

      setTodoBodyError(true);

      return;
    }

    const newTodo: TodoType = {
      title: todoTitleValue,
      body: todoBodyValue,
    };

    setTodosArr((prev) => [...prev, newTodo]);
  }

  return (
    <div className="centerPageContainer">
      <div className="centerPageTopContainer">
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
      </div>
      <div className="mainContentContainer">
        <MainContent />
      </div>
    </div>
  );
}
