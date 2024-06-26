"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { loginFormType, registrationAdminFormType } from "@/types/schema";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

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
    typeof window !== "undefined" ? localStorage.getItem("user") : null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const login = (userData: loginFormType) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/api/admin/login", userData)
      .then((response) => {
        console.log(response);
        if (response.data.status === 1) {
          toast({
            description: `Welcome ${userData.email}!`,
            title: "✅ SUCCESS",
          });
          localStorage.setItem("user", userData.email);
          setUser(userData.email);
        } else {
          toast({
            variant: "destructive",
            description: `Invalid credentials. Please try again.`,
            title: "❌ ERROR",
          });
          setUser(null);
        }
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
    toast({
      description: `Logged out!`,
      title: "✅ SUCCESS",
    });
  };

  const register = async (
    userData: registrationAdminFormType
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:8080/api/admin/register",
        userData
      );
      setLoading(false);
      return result.data.status;
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
