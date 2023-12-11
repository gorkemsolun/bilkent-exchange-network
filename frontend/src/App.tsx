import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./app/authentication/AuthContext";
import { useAuthContext } from "./app/authentication/authHelpers";
import Signup from "./app/authentication/signup";
import Borrow from "./app/borrow";
import Donate from "./app/donate";
import Forum from "./app/forum";
import Login from "./app/login";
import LostFound from "./app/lostfound";
import Profile from "./app/profile";
import SecondHand from "./app/secondhand";
import SectionExchange from "./app/sectionexchange";
import Signup from "./app/newSignup/signup";
import { AuthContextProvider } from "./authentication/AuthContext";
import { useAuthContext } from "./authentication/useAuthContext";
import VerificationPage from "./app/verificationPage/Verification"

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
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/secondhand" />}
          />
          <Route
            path="/secondhand"
            element={user ? <SecondHand /> : <Navigate to="/login" />}
          />
          <Route
            path="/lostfound"
            element={user ? <LostFound /> : <Navigate to="/login" />}
          />
          <Route
            path="/donate"
            element={user ? <Donate /> : <Navigate to="/login" />}
          />
          <Route
            path="/borrow"
            element={user ? <Borrow /> : <Navigate to="/login" />}
          />
          <Route
            path="/sectionexchange"
            element={user ? <SectionExchange /> : <Navigate to="/login" />}
          />
          <Route
            path="/forum"
            element={user ? <Forum /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/secondhand" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/secondhand" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/verification" element={!user ? <VerificationPage /> : <Navigate to ="/secondhand"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
