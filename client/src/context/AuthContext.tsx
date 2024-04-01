import React, { ReactNode, createContext, useContext, useState } from "react";
import { loginFormType, registrationAdminFormType } from "@/types/schema";
import { User } from "@/types/types";
import axios from "axios";

type AuthContextProps = {
  user: string | null;
  login: (userData: loginFormType) => void;
  logout: () => void;
  register: (userData: registrationAdminFormType) => Promise<boolean>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: (userData: loginFormType) => {},
  logout: () => {},
  register: async (userData: registrationAdminFormType) => false,
  loading: false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("user") || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const login = (userData: loginFormType) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/api/admin/login", userData)
      .then((response) => {
        localStorage.setItem("user", userData.email);
        setUser(userData.email);
        setLoading(false);
      })
      .catch((error) => {
        setUser(null);
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = async (
    userData: registrationAdminFormType
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/admin/register", userData);
      setLoading(false);
      return true; // Registration succeeded
    } catch (error) {
      setLoading(false);
      return false; // Registration failed
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
