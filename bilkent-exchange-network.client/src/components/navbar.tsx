import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-cyan-300">
      <ul className="flex flex-row object-fill divide-x-5 ml-1 justify-center">
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/secondhand/secondhand">
            Secondhand
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/lostfound/lostfound">
            Lost & Found
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/donate/donate">
            Donate
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/borrow/borrow">
            Borrow
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link
            className="home-navbar-link"
            to="/sectionexchange/sectionexchange"
          >
            Section Exchange
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link className="home-navbar-link" to="/home/forum">
            Forum
          </Link>
        </li>
      </ul>
    </nav>
  );
}
