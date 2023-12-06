import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SecondHand from "./app/secondhand/secondhand";
import LostFound from "./app/lostfound/lostfound.tsx";
import Donate from "./app/donate/donate";
import Borrow from "./app/borrow/borrow";
import Forum from "./app/forum/forum";
import SectionExchange from "./app/sectionexchange/sectionexchange";
import Login from "./app/login/login";
import Header from "./components/header";
import Navbar from "./components/navbar";
import "./App.css";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Navbar></Navbar>

        <Link
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          to="/login"
        >
          Login
        </Link>
        <Routes>
          <Route path="/" element={<SecondHand />}></Route>
          <Route path="/secondhand/secondhand" element={<SecondHand />}></Route>
          <Route path="/lostfound/lostfound" element={<LostFound />}></Route>
          <Route path="/donate/donate" element={<Donate />}></Route>
          <Route path="/borrow/borrow" element={<Borrow />}></Route>
          <Route
            path="/sectionexchange/sectionexchange"
            element={<SectionExchange />}
          ></Route>
          <Route path="/forum/forum" element={<Forum />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
