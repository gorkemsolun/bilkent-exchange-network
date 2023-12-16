import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./AuthHelpers";

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

  const imageUrls = [
    "https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554088559-b9c59b87915a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553773077-91673524aafa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553785063-9e892a3f15b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553696590-4b3f68898333?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555231955-348aa2312e19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://www.technopat.net/sosyal/eklenti/mountains_peaks_snow_192502_1920x1080-jpg.1367847/",
    "https://images.unsplash.com/photo-1554493752-e4543263886c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1556575157-75a0d60e4835?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1557995744-18c7f67f4307?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560065569-21beb63d2b0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-200 text-gray-700 bg-cover bg-no-repeat bg-center w-screen h-screen"
      style={{
        backgroundImage: `url("${getRandomImageUrl()}")`,
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
          <Link className="text-blue-400 hover:text-blue-500" to="/">
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
              className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
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
