"use client"

import { AdminRequestUser } from "@/types/types"
import { ColumnDef } from "@tanstack/react-table"
import { DecisionCell } from "./DecisionCell";

export const columns: ColumnDef<AdminRequestUser>[] = [
  {
    accessorKey: "idNumber",
    header: "ID Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <DecisionCell user={user} />;
    },
  },
]
