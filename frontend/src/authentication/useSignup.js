import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signUpRequest = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      /*
       * Update the auth context.
       * TODO: might need some change when email verification is added
       * maybe it should update auth context after we verify the user.
       */
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signUpRequest, isLoading, error };
};
