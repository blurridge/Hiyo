'use client'

import { Navbar } from "@/components/admin/home/Navbar";
import { DataTable } from "@/components/admin/home/user-table/DataTable";
import { columns } from "@/components/admin/home/user-table/columns";
import { useUser } from "@/context/UserContext";

export const Page = () => {
  const { users, loading } = useUser();
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
