import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { useAuthContext } from "./authentication/useAuthContext";

export default function App() {
 
  return (
    <div>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </div>
  );
}

function AppContent() {
  const {user} = useAuthContext()
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!user ? <Login /> :<Navigate to ="/secondhand"/> } />
            <Route path="/secondhand" element={user ? <SecondHand /> : <Navigate to ="/login"/>} />
            <Route path="/lostfound" element={user ? <LostFound /> : <Navigate to ="/login"/>} />
            <Route path="/donate" element={user ? <Donate /> : <Navigate to ="/login"/>} />
            <Route path="/borrow" element={user ? <Borrow /> : <Navigate to ="/login"/>} />
            <Route path="/sectionexchange" element={user ? <SectionExchange /> : <Navigate to ="/login"/>} />
            <Route path="/forum" element={user ? <Forum /> : <Navigate to ="/login"/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to ="/secondhand"/>} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to ="/secondhand"/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}
