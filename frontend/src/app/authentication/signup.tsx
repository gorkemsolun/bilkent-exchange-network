import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useEmailToken, useSignup } from "./AuthHelpers";

export default function Signup() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams(); // This should be fixed
  const emailToken = searchParams.get("emailToken");
  const email = searchParams.get("email");
  const { signUpRequest } = useSignup();
  const { getToken } = useEmailToken();

  useEffect(() => {
    const fetchData = async () => {
      if (emailToken) {
        try {
          const json = await getToken(emailToken);

          if (json.error) {
            return;
          }

          localStorage.setItem("verified", "true");
          setVerified(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [emailToken, getToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verified) {
      await signUpRequest(username, email as string, password);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700"
      style={{
        backgroundImage: `url("https://www.technopat.net/sosyal/eklenti/mountains_peaks_snow_192502_1920x1080-jpg.1367847/")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/*<img src="bilkent.png" width={"250"} height={"250"} />*/}
        <h1 className="mb-1 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Sign Up
        </h1>
      </div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-90"
        style={{ width: "23rem" }}
        onSubmit={handleSubmit}
        //disabled = {isLoading}
      >
        <label
          className="font-semibold text-s mt-2"
          style={{ textAlign: "left" }}
        >
          Username
        </label>
        <input
          className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full"
          type="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Enter your username"
        />
        <label
          className="font-semibold text-s mt-2"
          style={{ textAlign: "left" }}
        >
          Password
        </label>
        <input
          type="password"
          className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />

        <div className="flex mt-6 justify-center text-xs">
          <Link className="text-blue-400 hover:text-blue-500" to="/login">
            Already have an account? Login
          </Link>
        </div>

        <button
          className="flex items-center justify-center h-12 px-6 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 w-full"
          type="button"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
