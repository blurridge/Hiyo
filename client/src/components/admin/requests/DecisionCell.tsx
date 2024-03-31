"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { AdminRequestUser } from "@/types/types";
import { useRequests } from "@/context/RequestContext";

interface DecisionCellProps {
  user: AdminRequestUser;
}

export const DecisionCell: React.FC<DecisionCellProps> = ({ user }) => {
  const { toast } = useToast();
  const { fetchUsers } = useUser();
  const { fetchRequests } = useRequests();

  const approveUser = (idNumber: string) => {
    axios
      .post(`http://localhost:8080/api/admin/${idNumber}/approve`)
      .then((response) => {
        toast({
          description: `ID ${idNumber} successfully approved!`,
          title: "✅ SUCCESS",
        });
        fetchRequests();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `An error occurred approving ID ${idNumber}`,
          title: "❌ ERROR",
        });
      });
  };

  const rejectUser = (idNumber: string) => {
    axios
      .delete(`http://localhost:8080/api/admin/${idNumber}/reject`)
      .then((response) => {
        toast({
          description: `ID ${idNumber} successfully rejected!`,
          title: "✅ SUCCESS",
        });
        fetchRequests();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `An error occurred rejecting ID ${idNumber}`,
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
        <DropdownMenuItem onClick={() => approveUser(user.idNumber)}>
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => rejectUser(user.idNumber)}>
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
