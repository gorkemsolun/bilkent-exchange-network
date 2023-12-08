import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Borrow from "./app/borrow/borrow";
import Donate from "./app/donate/donate";
import Forum from "./app/forum/forum";
import Login from "./app/login/login";
import LostFound from "./app/lostfound/lostfound";
import SecondHand from "./app/secondhand/secondhand";
import SectionExchange from "./app/sectionexchange/sectionexchange";
import Signup from "./app/signup/signup";
import { AuthContextProvider } from "./authentication/AuthContext";

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
