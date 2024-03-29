"use client";
import { Attendance, User } from "@/types/types";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextProps = {
  users: User[] & Attendance[];
  loading: boolean;
};

const UserContext = createContext<UserContextProps>({
  users: [],
  loading: true,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[] & Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/").then(function (response) {
      console.log(response.data);
      console.log(response.data)
      setUsers(response.data);
    });
    setLoading(false);
  }, []);
  return (
    <UserContext.Provider value={{ users, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
