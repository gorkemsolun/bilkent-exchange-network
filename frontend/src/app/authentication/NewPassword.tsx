import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import { forgotPassword, useEmailToken, useLogin } from "./AuthHelpers";

export default function NewPassword() {
  const [password, setPassword] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const emailToken = searchParams.get("emailToken");
  const email = searchParams.get("email");
  const { getToken } = useEmailToken();
  const { login } = useLogin();

  useEffect(() => {
    const fetchData = async () => {
      if (emailToken) {
        try {
          const json = await getToken(emailToken);

          if (json.error) {
            setError(json.error);
            return;
          }

          localStorage.setItem("verified", "true");
          setVerified(true);
        } catch (error) {
          setError(error as string);
        }
      }
    };

    fetchData();
  }, [emailToken, getToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verified) {
      if (email) {
        await forgotPassword(email, password);
        await login(email, password);
      }
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
        <h1 className="mb-1 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Enter Your New Password
        </h1>
      </div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-90"
        style={{ width: "23rem" }}
        onSubmit={handleSubmit}
      >
        <label
          className="font-semibold text-s mt-2"
          style={{ textAlign: "left" }}
        >
          New Password
        </label>
        <input
          type="password"
          className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />

        <button
          className="flex items-center justify-center h-12 px-6 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700 w-full"
          type="submit"
        >
          Change Password And Login
        </button>
      </form>
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}
