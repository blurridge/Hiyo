"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/types";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useUser } from "@/context/UserContext";

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
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { toast } = useToast();
      const { users, fetchUsers } = useUser();
      const deleteUser = (idNumber: string) => {
        const id = idNumber;
        axios
          .delete(`http://localhost:8080/api/user/${id}`)
          .then((response) => {
            toast({
              description: `ID ${id} successfully deleted!`,
              title: "✅ SUCCESS",
            });
            fetchUsers();
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              description: `An error occurred deleting ID ${id}`,
              title: "❌ ERROR",
            });
          });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.idNumber)}
            >
              Copy ID number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteUser(user.idNumber)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
