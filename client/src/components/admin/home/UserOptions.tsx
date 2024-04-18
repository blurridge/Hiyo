import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export const UserOptions = () => {
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState<string>("");
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);
  return (
    <>
      <div className="flex gap-2 items-center justify-center mr-7">
        <span className="font-semibold">
          {currentUser ? currentUser : "Loading..."}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
