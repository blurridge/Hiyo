"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/attendance");
  }, []); // Adding an empty dependency array to useEffect

  return null; // Since this component is just for redirection, return null
};

export default Page;
