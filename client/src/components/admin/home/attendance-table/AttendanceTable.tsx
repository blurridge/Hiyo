import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attendance } from "@/types/types";

interface AttendanceTableProps {
  attendance: Attendance[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  attendance,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Time Entered</TableHead>
          <TableHead>Time Left</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance.map((att: Attendance) => (
          <TableRow key={att.attendanceId}>
            <TableCell className="font-medium">
              {att.timeEntered
                ? new Date(att.timeEntered).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </TableCell>
            <TableCell>
              {att.timeEntered && !isNaN(new Date(att.timeEntered).getTime())
                ? new Date(att.timeEntered).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "N/A"}
            </TableCell>
            <TableCell>
              {att.timeLeft && !isNaN(new Date(att.timeLeft).getTime())
                ? new Date(att.timeLeft).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
