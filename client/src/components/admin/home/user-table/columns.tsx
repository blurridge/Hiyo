"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/types";
import { ActionCell } from "./ActionCell";
import { AttendanceSheet } from "./AttendanceSheet";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "idNumber",
    header: "ID Number",
  },
  {
    accessorKey: "userName",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    filterFn: 'dateFilterFn',
    cell: ({ row }) => {
      const user = row.original;
      return <AttendanceSheet user={user} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <ActionCell user={user} />;
    },
  },
];
