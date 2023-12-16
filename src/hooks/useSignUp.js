import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useSignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://interviewproject-api.onrender.com/api/createuser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastname: lastName, email, password }),
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
}