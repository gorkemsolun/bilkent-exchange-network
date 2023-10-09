import Link from "next/link";

export default function HomeNavbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-cyan-100">
      <ul className="flex flex-row object-fill divide-x-5 ml-1">
        <li className="home-navbar-li">
          <Link href="/home/secondhand" className="home-navbar-link">
            Secondhand
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/home/lost-found" className="home-navbar-link">
            Lost & Found
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/home/donate" className="home-navbar-link">
            Donate
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/home/borrow" className="home-navbar-link">
            Borrow
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/home/section-exchange" className="home-navbar-link">
            Section Exchange
          </Link>
        </li>
        <li className="home-navbar-li">
          <Link href="/home/forum" className="home-navbar-link">
            Forum
          </Link>
        </li>
      </ul>
    </nav>
  );
}
