"use client";

import { RequestContextProvider } from "@/context/RequestContext";

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RequestContextProvider>{children}</RequestContextProvider>;
};

export default Layout;
