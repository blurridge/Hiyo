"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AttendanceTable } from "../attendance-table/AttendanceTable";
import { ActionCell } from "./ActionCell";

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
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">View Attendance</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Attendance record of {user.userName}</SheetTitle>
            </SheetHeader>
            <AttendanceTable attendance={user.attendance} />
          </SheetContent>
        </Sheet>
      );
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
