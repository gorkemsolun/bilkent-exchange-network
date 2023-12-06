import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-300 flex flex-row justify-center content-center items-center text-slate-800">
      <img className="w-20 p-2" src="logo.png" alt="Logo" />
      <Link className="p-4 text-2xl" to="/">
        Bilkent Exchange Network
      </Link>
    </div>
  );
}
