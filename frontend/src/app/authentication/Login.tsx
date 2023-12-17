/**
 * Represents the Login component.
 * This component is responsible for rendering the login form and handling user login functionality.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundManager from "../components/BackgroundManager";
import { useLogin } from "./AuthHelpers";

/**
 * This function initializes a new BackgroundManager instance and retrieves a random image URL.
 * @returns {string} The URL of a random image.
 */
const bg = new BackgroundManager();
const url = bg.getRandomImageUrl();

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState<string>("Loading");
  const { login, error, isLoading } = useLogin();

  /**
   * React component for the login page.
   *
   * This component displays a login form and handles user authentication.
   * It includes a loading message that updates periodically while waiting for the login process to complete.
   *
   * @returns JSX element representing the login page.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingMessage((prevMessage) => {
        return prevMessage === "Loading..." ? "Loading" : prevMessage + ".";
      });
    }, 75);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  /**
   * Handles the login process when the login button is clicked.
   *
   * @param e - The click event object.
   * @returns Promise that resolves when the login process is complete.
   */
  const handleLogin = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-200 text-gray-700 bg-cover bg-no-repeat bg-center w-screen h-screen"
      style={{
        backgroundImage: `url("${url}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* (potential) BUG_1: FIX THIS PART. EVEN THOUGH OTHER RESOURCES ADJUSTS THEIR SIZE ACCORDING TO CLIENT BILKENT LOGO DOES NOT DO THAT! */}
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to BEN!
        </h1>
      </div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-95"
        action=""
      >
        <label className="font-semibold text-s mt-2">Email</label>
        <input
          className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full mt-1"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <label className="font-semibold text-s mt-2">Password</label>
        <input
          className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full mt-1"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleLogin(
                e as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>
              );
            }
          }}
          placeholder="Password"
        />

        <div className="flex mt-6 justify-center text-xs">
          <Link
            className="text-blue-400 hover:text-blue-500"
            to="/forgetPassword"
          >
            Forgot Password
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link
            className="text-blue-400 hover:text-blue-500"
            to="/verification"
          >
            Sign Up
          </Link>
        </div>
        <div>
          {isLoading ? (
            <div style={{ marginTop: "20px" }}>
              <span
                style={{ color: "#3490dc" }}
                className="loading-msg font-semibold text-s mt-2"
              >
                {loadingMessage}
              </span>
            </div>
          ) : (
            <Link
              className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 opacity-100"
              to="/secondhand"
              onClick={handleLogin}
            >
              Login
            </Link>
          )}
        </div>
        {error && (
          <div style={{ marginTop: "20px" }}>
            <div
              style={{ color: "#3490dc" }}
              className="error font-semibold text-s mt-2"
            >
              {error}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
