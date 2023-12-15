import { createContext, useEffect, useReducer } from "react";


export const ProfileContext = createContext();


const profileReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        return { profile: action.payload };
      case "LOGOUT":
        return { profile: null };
      default:
        return state;
    }
  };


export const ProfileContextProvider = ({ children }) => {
  const [state, profileDispatch] = useReducer(profileReducer, {
    profile: null,
  });

  //when the webpage is reloaded
  
 
    
  
  useEffect(() => {
    
    const profile = JSON.parse(localStorage.getItem("profile") as string);

    if (profile) {
      profileDispatch({ type: "UPDATE", payload: profile });
      console.log("from profile context updated")
    }
  }, [profileDispatch]);
  

  console.log("ProfileContext state: ", state);

  return (
    <ProfileContext.Provider value={{ ...state, profileDispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
