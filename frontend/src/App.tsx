import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./app/authentication/AuthContext";
import VerificationPage from "./app/authentication/Verification";
import { useAuthContext } from "./app/authentication/authHelpers";
import Signup from "./app/authentication/signup";
import Borrow from "./app/borrow";
import Donate from "./app/donate";
import Forum from "./app/forum";
import Login from "./app/login";
import LostFound from "./app/lostfound";
import MyProfile from "./app/myprofile";
import Profile from "./app/profile";
import SecondHand from "./app/secondhand";
import SectionExchange from "./app/sectionexchange";
import "./bootstrap.css";
import LostFoundPostDetails from "./app/post-details/LostFoundPostDetails";
import SecondHandPostDetails from "./app/post-details/SecondHandPostDetails";
import DonatePostDetails from "./app/post-details/DonatePostDetails";
import ForumPostDetails from "./app/post-details/ForumPostDetails";
import BorrowPostDetails from "./app/post-details/BorrowPostDetails";
import EditProfile from "./app/editprofile";

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
            path="/verification"
            element={
              !user ? <VerificationPage /> : <Navigate to="/secondhand" />
            }
          />
          <Route
            path="/secondhandpost/:id"
            element={<SecondHandPostDetails />}
          />
          <Route path="/lostfoundpost/:id" element={<LostFoundPostDetails />} />
          <Route path="/donatepost/:id" element={<DonatePostDetails />} />
          <Route path="/borrowpost/:id" element={<BorrowPostDetails />} />
          <Route path="/forumpost/:id" element={<ForumPostDetails />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/myprofile/edit" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
