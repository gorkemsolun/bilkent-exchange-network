import axios from "axios";
import { useContext, useState } from "react";
import { profileUrl } from "../../data-types/constants";
import {
  ProfileContextType,
  UserAction,
  UserContextType,
  UserState,
} from "../../data-types/datatypes";
import { ProfileContext } from "../profile/ProfileContext";
import { AuthContext } from "./AuthContext";

/**
 * Custom hook that provides access to the profile context.
 * @returns The profile context.
 * @throws {Error} If used outside of a ProfileContextProvider.
 */
export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw Error(
      "useProfileContext must be used inside an ProfileContextProvider"
    );
  }

  return context;
};

/**
 * Custom hook for logging out the user.
 * Removes user data from storage and updates the authentication context.
 * @returns An object with the logout function.
 */
export const useLogout = () => {
  const dispatch = (useAuthContext() as unknown as UserContextType).dispatch;
  const profileDispatch = (useProfileContext() as unknown as UserContextType)
    .dispatch;

  /**
   * Logs out the user.
   * Removes user data from storage and updates the authentication and profile contexts.
   */
  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    // update auth context with logout
    dispatch({ type: "LOGOUT", payload: null });

    localStorage.removeItem("profile");

    profileDispatch({ type: "LOGOUT", payload: null });
  };

  return { logout };
};

/**
 * Reducer function for handling authentication-related actions.
 * @param state - The current state of the user.
 * @param action - The action to be performed.
 * @returns The updated state after performing the action.
 */
export const authReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

/**
 * Custom hook that returns the authentication context.
 * @returns The authentication context.
 * @throws {Error} If used outside of an AuthContextProvider.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

/**
 * Custom hook for handling login functionality.
 * @returns An object containing the login function, isLoading state, and error state.
 */
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = (useAuthContext() as unknown as UserContextType).dispatch;

  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(json.error);
    } else {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      await axios
        .get(`${profileUrl}/${json._id}`)
        .then((res) => {
          localStorage.setItem("profile", JSON.stringify(res.data.profile));
          const resBody = res.data.profile;
          profileDispatch({ type: "UPDATE", payload: resBody });
        })
        .catch((err) => {
          console.log(err);
        });

      //update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

/**
 * Custom hook for user signup.
 *
 * @returns An object containing the signup request function, loading state, and error state.
 */
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = (useAuthContext() as unknown as UserContextType).dispatch;

  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  const signUpRequest = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(json.error);
    } else {
      //save the user to local storage
      await axios
        .get(`${profileUrl}/${json._id}`)
        .then((res) => {
          localStorage.setItem("profile", JSON.stringify(res.data.profile));
          const resBody = res.data.profile;
          profileDispatch({ type: "UPDATE", payload: resBody });
        })
        .catch((err) => {
          console.log(err);
        });

      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { signUpRequest, isLoading, error };
};

/**
 * Custom hook for handling email token functionality.
 *
 * @returns An object containing functions for creating and retrieving email tokens, as well as an error state.
 */
export const useEmailToken = () => {
  const [error, setError] = useState(null);

  /**
   * Creates a token by sending a POST request to the server.
   *
   * @returns A Promise that resolves to the JSON response from the server.
   */
  const createToken = async () => {
    setError(null);

    const res = await fetch("http://localhost:3000/user/emailToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      console.log(json.error);
    }
    return json;
  };

  /**
   * Retrieves a token by sending a POST request to the server with the provided email token.
   *
   * @param emailToken - The email token to retrieve.
   * @returns A Promise that resolves to the JSON response from the server.
   */
  const getToken = async (emailToken: string) => {
    setError(null);

    const res = await fetch("http://localhost:3000/user/getEmailToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailToken }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      console.log(json.error);
    }
    return json;
  };

  return { createToken, error, getToken };
};

/**
 * Custom hook for sending a verification email.
 * @returns An object containing the sendEmail function, isLoading state, and verificationError state.
 */
export const useVerificationEmail = () => {
  const [verificationError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Sends a verification email.
   * @param name - The name of the recipient.
   * @param email - The email address of the recipient.
   */
  const sendEmail = async (name: string, email: string) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("http://localhost:3000/user/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(json.error);
    } else {
      //might need a context? I don't think so for now.
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, verificationError };
};

/**
 * Deletes a user with the specified userId.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted successfully.
 */
export const deleteUser = async (userId: string) => {
  try {
    await axios.delete(`http://localhost:3000/user/delete/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

/**
 * Sends a request to the server to reset the user's password.
 * @param email - The user's email address.
 * @param password - The new password.
 */
export const forgotPassword = async (email: string, password: string) => {
  try {
    await fetch("http://localhost:3000/user/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
  } catch (error) {
    console.error("Error updating password:", error);
  }
};
