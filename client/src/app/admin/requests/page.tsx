"use client";

import { Navbar } from "@/components/admin/home/Navbar";
import { RequestsTable } from "@/components/admin/requests/RequestsTable";
import { columns } from "@/components/admin/requests/columns";
import { useAuth } from "@/context/AuthContext";
import { useRequests } from "@/context/RequestContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Page = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { requests } = useRequests();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/admin/login");
    }
  }, [user, loading]);

  if (!requests) {
    return (
      <>
        <div className="flex flex-col gap-3 h-screen items-center">
          <Navbar />
          <span>No requests found.</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Navbar />
        <RequestsTable columns={columns} data={requests} />
      </div>
    </>
  );
};

export default Page;
