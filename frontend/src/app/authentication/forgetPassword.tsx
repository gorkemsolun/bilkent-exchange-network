import axios from "axios";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
  };

  return (
    <div className="forgot-password-body">
      <h2 className="forgot-password-h2">Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <label className="forgot-password-label">Email:</label>
        <div className="forgot-password-button"></div>
        <input
          className="forgot-password-input"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="Enter your email"
        />
        <button className="forgot-password-button" type="submit">
          Submit
        </button>
      </form>
      {message && <p className="forgot-password-p">{message}</p>}
    </div>
  );
}
