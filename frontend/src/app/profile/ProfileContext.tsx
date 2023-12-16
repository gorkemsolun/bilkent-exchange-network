import { createContext, useEffect, useReducer } from "react";
import { ProfileAction, ProfileState } from "../../data-types/datatypes";

export const ProfileContext = createContext({});

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

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, profileDispatch] = useReducer(profileReducer, {
    profile: null,
  });

  //when the webpage is reloaded
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
