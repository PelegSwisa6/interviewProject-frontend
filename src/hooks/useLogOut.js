import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogOut() {
  const { dispatch } = useAuthContext();

  const logout = async (name, lastName, email, password) => {
    // Remove the "user" item from local storage
    localStorage.removeItem("user");

    // update the auth context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}
