import axios from "axios";
import { useState } from "react";
import BackgroundManager from "../components/BackgroundManager";
import { useLogin } from "./AuthHelpers";
import { Link } from "react-router-dom";
import VerificationModal from "../components/VerificationModal";

const bg = new BackgroundManager();
const url = bg.getRandomImageUrl();

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { login, error, isLoading } = useLogin();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/forgetPassword",
        {
          email: email,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setMessage("An error occurred. Please try again.");
    }
    setIsVerifying(true);
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
      <div className="flex flex-col items-center justify-center"></div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-95"
        onSubmit={handleSubmit}
      >
        {isVerifying ? (
          <VerificationModal email={email} />
        ) : (
          <>
            <label className="font-semibold text-s mt-2">Email</label>
            <input
              className="flex items-center h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 w-full mt-1"
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />

            <div>
              <button className="forgot-password-button" type="submit">
                Submit
              </button>
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
          </>
        )}
      </form>
    </div>
  );
}
