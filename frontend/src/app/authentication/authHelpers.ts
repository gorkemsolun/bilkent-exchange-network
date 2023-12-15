import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ProfileContext } from "../ProfileContext";
import axios from 'axios';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  //console.log(context);

  if (!context) {
    throw Error("useProfileContext must be used inside an ProfileContextProvider");
  }

  return context;
}


export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    // update auth context with logout
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  //console.log(context);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dispatch } = useAuthContext();
  const {profileDispatch} = useProfileContext();

  const login = async (email, password) => {
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
    } else {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      
     await axios
      .get(`http://localhost:3000/profile/profile/${json._id}`)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data.profile))
        const resBody = res.data.profile
        profileDispatch({type: "UPDATE", payload: resBody})
      })
      .catch((err) => {
        console.log(err);
      })
      
      //update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dispatch } = useAuthContext();
  const {profileDispatch} = useProfileContext();
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
      
      await axios
      .get(`http://localhost:3000/profile/profile/${json._id}`)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data.profile))
        const resBody = res.data.profile
        profileDispatch({type: "UPDATE", payload: resBody})
      })
      .catch((err) => {
        console.log(err);
      })
      
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });


      setIsLoading(false);
    }
  };

  return { signUpRequest, isLoading, error };
};

export const useEmailToken = () => {
  const [error, setError] = useState(null);

  const createToken = async () => {
    setError(null);

    const res = await fetch("http://localhost:3000/user/emailToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    return json;
  };

  const getToken = async (emailToken) => {
    setError(null);

    const res = await fetch("http://localhost:3000/user/getEmailToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailToken }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    return json;
  };

  return { createToken, error, getToken };
};

export const useVerificationEmail = () => {
  const [verificationError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendEmail = async (name, email) => {
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
    } else {
      //might need a context? I don't think so for now.
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, verificationError };
};

// Define a function to delete the user
export const deleteUser = async (userId) => {
  try {
    // Send a request to your server to delete the user
    const response = await axios.delete(
      `http://localhost:3000/user/delete/${userId}`
    );

    // Handle the response as needed
    console.log(response.data); // Log the response if necessary
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
