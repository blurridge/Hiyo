import { Navbar } from "@/components/admin/home/Navbar";
import { DataTable } from "@/components/admin/home/user-table/DataTable";
import { columns } from "@/components/admin/home/user-table/columns";
import { User } from "@/types/types";

function getData(): User[] {
  // Fetch data from your API here.
  return [
    {
      idNumber: "18020919",
      userName: "Zach Riane",
      address: "sad",
      contactNumber: "09173198899",
      email: "18020919@usc.edu.ph",
    },
    {
      idNumber: "1212121212",
      userName: "Zach Riane",
      address: "sad",
      contactNumber: "09173198899",
      email: "18020919@usc.edu.ph",
    },
    {
      idNumber: "18020919",
      userName: "Zach Riane",
      address: "sad",
      contactNumber: "09173198899",
      email: "18020919@usc.edu.ph",
    },
    {
      idNumber: "18020919",
      userName: "Zach Riane",
      address: "sad",
      contactNumber: "09173198899",
      email: "18020919@usc.edu.ph",
    },
    // ...
  ];
}

export const Page = () => {
  const data = getData();
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Page;
