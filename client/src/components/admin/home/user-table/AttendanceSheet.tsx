import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AttendanceTable } from "../attendance-table/AttendanceTable";
import { User } from "@/types/types";

interface AttendanceSheetProps {
  user: User;
}

export const AttendanceSheet: React.FC<AttendanceSheetProps> = ({ user }) => {
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
};
