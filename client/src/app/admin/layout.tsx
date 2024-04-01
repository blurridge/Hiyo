"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { RequestContextProvider } from "@/context/RequestContext";

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <RequestContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </RequestContextProvider>
    </>
  );
};

export default Layout;
