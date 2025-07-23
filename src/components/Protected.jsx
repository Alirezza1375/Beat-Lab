import React from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";

function Protected({ children }) {
  const { token, user } = useAuthContext();
  return token && user ? <Outlet /> : <Navigate to="/login" />;
}

export default Protected;
