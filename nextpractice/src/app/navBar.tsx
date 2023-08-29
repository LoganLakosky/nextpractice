import "./navBar.css";
import Link from 'next/link'

export default function NavBar() {
  return (
    <div className="navBarContainer">
      <div className="navBarLeft">
        <h1>Tod's Todo's</h1>
      </div>
      <div className="navBarRight">
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>
    </div>
  );
}
