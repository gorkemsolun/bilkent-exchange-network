import { useState } from "react";

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
      return json
    };

    const getToken = async (emailToken) => {
        setError(null)

        const res = await fetch("http://localhost:3000/user/getEmailToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({emailToken})
      });

      const json = await res.json()

      if(!res.ok) {
        setError(json.error)
      }
       return json
    }
  
    return { createToken, error, getToken };
  };