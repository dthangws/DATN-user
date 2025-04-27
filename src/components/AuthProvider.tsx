import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", "dummy-token");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
