"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
import { User } from "@/types/types";

interface ActionCellProps {
  user: User;
}

export const ActionCell: React.FC<ActionCellProps> = ({ user }) => {
  const { toast } = useToast();
  const { fetchUsers } = useUser();

  const deleteUser = (idNumber: string) => {
    axios
      .delete(`http://localhost:8080/api/user/${idNumber}`)
      .then((response) => {
        toast({
          description: `ID ${idNumber} successfully deleted!`,
          title: "✅ SUCCESS",
        });
        fetchUsers();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `An error occurred deleting ID ${idNumber}`,
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
};
