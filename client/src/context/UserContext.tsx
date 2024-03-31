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
  users: User[];
  loading: boolean;
  fetchUsers: () => void;
};

const UserContext = createContext<UserContextProps>({
  users: [],
  loading: true,
  fetchUsers: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/")
      .then(function (response) {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <UserContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
