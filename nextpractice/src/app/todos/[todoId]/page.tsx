import "./todos.css";
import "../../navBar.css";
import Link from "next/link";

type Params = {
  params: {
    userId: string;
  };
};

export default function Todo({ params: { userId } }: Params) {
  return (
    <div className="todosPageMainContainer">
      <div className="navBarContainer">
        <div className="navBarLeft">
          <Link href="/">Tod's Todo's</Link>
        </div>
      </div>
      <div className="todosPageMainContent"></div>
    </div>
  );
}
