import { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundManager from "../components/BackgroundManager";
import VerificationModal from "../components/VerificationModal";
import { isValidEmail } from "../components/WebMailValidator";
import ErrorModal from "../components/errorModal";
import { useVerificationEmail } from "./AuthHelpers";

const bg = new BackgroundManager();
const url = bg.getRandomImageUrl();

export default function VerificationPage() {
  const [email, setEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { sendEmail } = useVerificationEmail();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter an email");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email address is not valid");
      return;
    }

    setIsVerifying(true);
    await sendEmail("", email);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700"
      style={{
        backgroundImage: `url("${url}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-1 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Verification
        </h1>
      </div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-95"
        style={{ width: "23rem" }}
        onSubmit={handleSubmit}
        placeholder="Enter your email address"
      >
        {isVerifying ? (
          <VerificationModal email={email} />
        ) : (
          <>
            <label
              className="font-semibold text-s mt-2"
              //style={{ textAlign: "left" }}
            >
              Email
            </label>
            <input
              className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email address"
            />

            <div className="flex mt-6 justify-center text-xs">
              <Link className="text-blue-400 hover:text-blue-500" to="/login">
                Already have an account? Login
              </Link>
            </div>

            <button
              className="flex items-center justify-center h-12 px-6 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 w-full"
              type="submit"
            >
              Send Verification Mail
            </button>
            <div style={{ marginTop: "30px" }}>
              {error && (
                <ErrorModal
                  message={error}
                  onClose={() => {
                    setError("");
                  }}
                />
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
