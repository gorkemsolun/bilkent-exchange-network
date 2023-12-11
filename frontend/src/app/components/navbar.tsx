import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-cyan-300 w-screen">
      <ul className="flex flex-row object-fill divide-x-5 ml-1 justify-center">
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/secondhand">
            Secondhand
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/lostfound">
            Lost & Found
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/donate">
            Donate
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/borrow">
            Borrow
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/sectionexchange">
            Section Exchange
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/forum">
            Forum
          </Link>
        </li>
      </ul>
    </nav>
  );
}
