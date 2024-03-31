"use client";

import { Navbar } from "@/components/admin/home/Navbar";
import { DataTable } from "@/components/admin/home/user-table/DataTable";
import { columns } from "@/components/admin/home/user-table/columns";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Page = () => {
  const { users } = useUser();
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/admin/login");
    }
  }, [user, loading]);

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
};

export default Page;
