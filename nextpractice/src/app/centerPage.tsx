import { useState, ChangeEvent } from "react";

type TodoType = {
  title: string;
  body?: string;
};

export default function CenterPage() {
  const [todoTitleValue, setTodoTitleValue] = useState<string>("");
  const [todoBodyValue, setTodoBodyValue] = useState<string>("");
  const [todosArr, setTodosArr] = useState<TodoType[]>([]);

  function updateTodoTitleValue(e: ChangeEvent<HTMLInputElement>) {
    setTodoTitleValue(e.target.value);
  }

  function updateTodoBodyValue(e: ChangeEvent<HTMLInputElement>) {
    setTodoBodyValue(e.target.value);
  }

  function createTodo() {
    if (todoTitleValue === "") {
      //ADD A BETTER ERROR MSG
      alert("Todo Title cannot be empty");

      return;
    }
    if (todoBodyValue === "") {
      //ADD A BETTER ERROR MSG
      alert("Todo Body cannot be empty");
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
            <label htmlFor="todo-title">Title:</label>
            <input
              value={todoTitleValue}
              type="text"
              id="todo-title"
              onChange={updateTodoTitleValue}
            />
          </div>
          <div className="todoBodyInputContainer">
            <label htmlFor="todo-body">Body:</label>
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
        {todosArr.map((todo) => {
          return <h1 key={todo.body}>{todo.title}</h1>;
        })}
      </div>
    </div>
  );
}
