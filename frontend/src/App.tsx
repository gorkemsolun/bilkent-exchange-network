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
            element={user ? <SecondHand /> : setTimeout(() => {<Navigate to="/login" />}, 100) }
          />
          <Route
            path="/lostfound"
            element={user ? <LostFound /> :  setTimeout(() => {<Navigate to="/login" />}, 100)}
          />
          <Route
            path="/donate"
            element={user ? <Donate /> :  setTimeout(() => {<Navigate to="/login" />}, 100)}
          />
          <Route
            path="/borrow"
            element={user ? <Borrow /> :  setTimeout(() => {<Navigate to="/login" />}, 100)}
          />
          <Route
            path="/sectionexchange"
            element={user ? <SectionExchange /> :  setTimeout(() => {<Navigate to="/login" />}, 100)}
          />
          <Route
            path="/forum"
            element={user ? <Forum /> :  setTimeout(() => {<Navigate to="/login" />}, 100)}
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
            element={ user ? <SecondHandPostDetails /> :  setTimeout(() => {<Navigate to="/login" />}, 100)}
          />
          <Route path="/lostfoundpost/:id" element={ user ? <LostFoundPostDetails /> :  setTimeout(() => {<Navigate to="/login" />}, 100)} />
          <Route path="/donatepost/:id" element={ user ? <DonatePostDetails /> :  setTimeout(() => {<Navigate to="/login" />}, 100)} />
          <Route path="/borrowpost/:id" element={user ? <BorrowPostDetails /> :  setTimeout(() => {<Navigate to="/login" />}, 100)} />
          <Route path="/forumpost/:id" element={user ? <ForumPostDetails /> :  setTimeout(() => {<Navigate to="/login" />}, 100)} />
          <Route path="/myprofile" element={user ? <MyProfile /> :  setTimeout(() => {<Navigate to="/login" />}, 100)} />
          <Route path="/profile/:id" element={user ? <Profile /> :  setTimeout(() => {<Navigate to="/login" />}, 100)} />
          <Route path="/myprofile/edit" element={user ? <EditProfile />:  setTimeout(() => {<Navigate to="/login" />}, 100)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
