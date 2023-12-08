import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecondHand from "./app/secondhand/secondhand";
import LostFound from "./app/lostfound/lostfound.tsx";
import Donate from "./app/donate/donate";
import Borrow from "./app/borrow/borrow";
import Forum from "./app/forum/forum";
import SectionExchange from "./app/sectionexchange/sectionexchange";
import Login from "./app/login/login";
import Signup from "./app/signup/signup.jsx";
import Header from "./components/header";
import Navbar from "./components/navbar";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/secondhand" element={<SecondHand />} />
            <Route path="/lostfound" element={<LostFound />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/sectionexchange" element={<SectionExchange />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}
