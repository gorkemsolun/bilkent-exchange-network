import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState(""); // Add state for surname
  const { signUpRequest, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpRequest(name, email, password);
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
        style={{ width: "25rem" }}
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <div className="flex-1 pr-1">
            <div className="flex flex-col">
              <label
                className="font-semibold text-s mt-2"
                style={{ textAlign: "left" }}
              >
                Name
              </label>
              <input
                className="flex items-center h-12 px-4 w-full bg-gray-200 rounded focus:outline-none focus:ring-2"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div className="flex-1 pl-1">
            <div className="flex flex-col">
              <label
                className="font-semibold text-s mt-2"
                style={{ textAlign: "left" }}
              >
                Surname
              </label>
              <input
                className="flex items-center h-12 px-4 w-full bg-gray-200 rounded focus:outline-none focus:ring-2"
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
              />
            </div>
          </div>
        </div>

        <label
          className="font-semibold text-s mt-2"
          style={{ textAlign: "left" }}
        >
          Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label
          className="font-semibold text-s mt-2"
          style={{ textAlign: "left" }}
        >
          Password
        </label>
        <input
          type="password"
          className="flex items-center h-12 px-4 w-64 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex mt-6 justify-center text-xs">
          <Link className="text-blue-400 hover:text-blue-500" to="/login">
            Already have an account? Login
          </Link>
        </div>

        <button
          disabled={isLoading}
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 w-full"
        >
          Sign Up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
