"use client";

import { LoginCard } from "@/components/admin/login/LoginCard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Page = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (user && !loading) {
      router.push("/admin/home");
    }
  }, [user, loading]);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-light-blue">
      <LoginCard />
    </div>
  );
};

export default Page;
