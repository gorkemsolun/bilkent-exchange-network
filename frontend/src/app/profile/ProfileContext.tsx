import { createContext, useEffect, useReducer } from "react";
import { ProfileAction, ProfileState } from "../../data-types/datatypes";

/**
 * Context for managing the profile state.
 */
export const ProfileContext = createContext({});

/**
 * Reducer function for the profile state.
 * @param state - The current profile state.
 * @param action - The profile action to be performed.
 * @returns The updated profile state.
 */
const profileReducer = (state: ProfileState, action: ProfileAction) => {
  switch (action.type) {
    case "UPDATE":
      return { profile: action.payload };
    case "LOGOUT":
      return { profile: null };
    default:
      return state;
  }
};

/**
 * Provider component for the ProfileContext.
 * @param children - The child components.
 */
export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, profileDispatch] = useReducer(profileReducer, {
    profile: null,
  });

  // When the webpage is reloaded, retrieve the profile from local storage
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile") as string);

    if (profile) {
      profileDispatch({ type: "UPDATE", payload: profile });
    }
  }, [profileDispatch]);

  return (
    <ProfileContext.Provider value={{ ...state, profileDispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
