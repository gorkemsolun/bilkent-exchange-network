import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./AuthHelpers";
import BackgroundManager from "../components/BackgroundManager";

const bg = new BackgroundManager();
const url = bg.getRandomImageUrl();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
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
        backgroundSize: "cover", // Adjust as needed
        backgroundPosition: "center", // Adjust as needed
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* (potential) BUG_1: FIX THIS PART. EVEN THOUGH OTHER RESOURCES ADJUSTS THEIR SIZE ACCORDING TO CLIENT BILKENT LOGO DOES NOT DO THAT! */}
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to BEN!
        </h1>
      </div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-90"
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
          placeholder="Password"
        />

        <div className="flex mt-6 justify-center text-xs">
          <Link className="text-blue-400 hover:text-blue-500" to="/forgetPassword">
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
            <span>Loading...</span>
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
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}