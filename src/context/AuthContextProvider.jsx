import React from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const storageToken = localStorage.getItem("token");
  const storageUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(storageToken ? storageToken : undefined);
  const [user, setUser] = useState(storageUser ? storageUser : undefined);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
