"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { AdminRequestUser } from "@/types/types";

type RequestContextProps = {
  requests: AdminRequestUser[];
  fetchRequests: () => void;
};

const RequestContext = createContext<RequestContextProps>({
  requests: [],
  fetchRequests: () => {},
});

export const RequestContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [requests, setRequests] = useState<AdminRequestUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchRequests = () => {
    axios
      .get("http://localhost:8080/api/admin/requests")
      .then(function (response) {
        setRequests(response.data.data);
      })
      .catch(function (error) {
        console.error("Failed to fetch users:", error);
      });
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <RequestContext.Provider value={{ requests, fetchRequests }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  return useContext(RequestContext);
};
