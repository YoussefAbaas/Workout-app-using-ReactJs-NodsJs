import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  console.log("auth context", user);
  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUser(user);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
