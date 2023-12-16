import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./app/authentication/AuthContext";
import { useAuthContext } from "./app/authentication/AuthHelpers";
import Login from "./app/authentication/Login";
import Signup from "./app/authentication/Signup";
import VerificationPage from "./app/authentication/Verification";
import Borrow from "./app/borrow/Borrow";
import BorrowPostDetails from "./app/borrow/BorrowPostDetails";
import Donate from "./app/donate/Donate";
import DonatePostDetails from "./app/donate/DonatePostDetails";
import Forum from "./app/forum/Forum";
import ForumPostDetails from "./app/forum/ForumPostDetails";
import LostFound from "./app/lostfound/Lostfound";
import LostFoundPostDetails from "./app/lostfound/LostfoundPostDetails";
import EditProfile from "./app/profile/EditProfile";
import MyProfile from "./app/profile/MyProfile";
import Profile from "./app/profile/Profile";
import { ProfileContextProvider } from "./app/profile/ProfileContext";
import SecondHand from "./app/secondhand/Secondhand";
import SecondHandPostDetails from "./app/secondhand/SecondhandPostDetails";
import SectionExchange from "./app/sectionexchange/Sectionexchange";
import AdminPage from "./app/admin/Admin";
import "./bootstrap.css";
import { UserContextType } from "./data-types/datatypes";

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <ProfileContextProvider>
          <AppContent />
        </ProfileContextProvider>
      </AuthContextProvider>
    </div>
  );
}

function AppContent() {
  const user = (useAuthContext() as unknown as UserContextType).user;

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
            element={
              user ? (
                <SecondHand />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/lostfound"
            element={
              user ? (
                <LostFound />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/donate"
            element={
              user ? (
                <Donate />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/borrow"
            element={
              user ? (
                <Borrow />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/sectionexchange"
            element={
              user ? (
                <SectionExchange />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/forum"
            element={
              user ? (
                <Forum />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
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
            path="/adminPage"
            element={!user ? <AdminPage /> : <Navigate to="/forum" />
            }
          />
          <Route
            path="/secondhandpost/:id"
            element={
              user ? (
                <SecondHandPostDetails />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/lostfoundpost/:id"
            element={
              user ? (
                <LostFoundPostDetails />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/donatepost/:id"
            element={
              user ? (
                <DonatePostDetails />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/borrowpost/:id"
            element={
              user ? (
                <BorrowPostDetails />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/forumpost/:id"
            element={
              user ? (
                <ForumPostDetails />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/myprofile"
            element={
              user ? (
                <MyProfile />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/profile/:id"
            element={
              user ? (
                <Profile />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />
          <Route
            path="/myprofile/edit"
            element={
              user ? (
                <EditProfile />
              ) : (
                setTimeout(() => {
                  <Navigate to="/login" />;
                }, 100)
              )
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
