/**
 * @fileoverview This file contains the implementation of the AuthContextProvider component and the AuthContext context.
 * The AuthContextProvider component is responsible for managing the authentication state of the application using the authReducer.
 * The AuthContext context provides the authentication state and the dispatch function to its child components.
 */

import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./AuthHelpers";

/**
 * The AuthContext context object.
 * @typedef {Object} AuthContext
 * @property {Object} state - The authentication state.
 * @property {Function} dispatch - The dispatch function to update the authentication state.
 */

/**
 * The AuthContext context.
 * @type {React.Context<AuthContext>}
 */
export const AuthContext = createContext({});

/**
 * The AuthContextProvider component.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // When the webpage is reloaded, try to check if the user was logged in using the local storage and update the auth context
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
