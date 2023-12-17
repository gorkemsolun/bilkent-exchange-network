/**
 * Component for the forgot password page.
 * Allows users to enter their email and submit a request to reset their password.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundManager from "../components/BackgroundManager";
import VerificationModal from "../components/VerificationModal";
import { useLogin } from "./AuthHelpers";

const bg = new BackgroundManager();
const url = bg.getRandomImageUrl();

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const { error } = useLogin();

  /**
   * Handles the change event of the email input field.
   * @param e - The change event
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * Handles the form submission event.
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <div className="flex mt-6 justify-center text-xs">
              <Link className="text-blue-400 hover:text-blue-500" to="/login">
                Already have an account? Login
              </Link>
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
