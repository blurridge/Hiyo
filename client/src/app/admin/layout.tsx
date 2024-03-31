"use client";

import { AuthContextProvider } from "@/context/AuthContext";

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default Layout;
