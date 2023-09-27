import Link from "next/link";

export default function HomeNavbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-cyan-100">
      <ul className="flex flex-row object-fill divide-x-5 ml-1">
        <li className="home-navbar-li">
          <Link href="/secondhand" className="home-navbar-link">
            Secondhand
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/lost-found" className="home-navbar-link">
            Lost & Found
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/borrow" className="home-navbar-link">
            Borrow
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/donate" className="home-navbar-link">
            Donate
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/forum" className="home-navbar-link">
            Forum
          </Link>
        </li>
      </ul>
    </nav>
  );
}
