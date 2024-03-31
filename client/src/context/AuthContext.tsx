import React, { ReactNode, createContext, useContext, useState } from "react";
import { loginFormType } from "@/types/schema";
import { User } from "@/types/types";
import axios from "axios";

type AuthContextProps = {
  user: string | null;
  login: (userData: loginFormType) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: (userData: loginFormType) => {},
  logout: () => {},
  loading: false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null);
  const [loading, setLoading] = useState<boolean>(false);
  const login = (userData: loginFormType) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/api/admin/login", userData)
      .then((response) => {
        localStorage.setItem('user', userData.email);
        setUser(userData.email);
        setLoading(false);
      })
      .catch((error) => {
        setUser(null);
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
