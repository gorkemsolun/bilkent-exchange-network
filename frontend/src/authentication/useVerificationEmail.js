import { useState } from "react";

export const useVerificationEmail = () => {
    const [verificationError, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
  
    const sendEmail = async (name, email) => {
      setIsLoading(true);
      setError(null);
  
      const res = await fetch("http://localhost:3000/user/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email}),
      });
  
      const json = await res.json();
  
      if (!res.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        //might need a context? I don't think so for now.
        setIsLoading(false);
      }
    };
  
    return { sendEmail, isLoading, verificationError };
  };