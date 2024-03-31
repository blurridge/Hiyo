import { User, Attendance } from "@/types/types";
import { FilterFn } from "@tanstack/react-table";

export const dateFilterFn: FilterFn<User> = (row, columnId, value) => {
  // Assuming 'value' is an object with 'start' and 'end' Date objects
  const { date, time } = value || {};
  if (!time || !date) return true; // No filter applied

  // Assuming 'attendance' data is an array of objects each with a 'timeEntered' property
  const attendanceRecords: Attendance[] = row.getValue(columnId);
  if (!attendanceRecords || attendanceRecords.length === 0) return false; // No records to display

  // Check if the selected time is exactly 00:00:00
  const isStartOfDay =
    time.getHours() === 0 && time.getMinutes() === 0 && time.getSeconds() === 0;

  return attendanceRecords.some((record) => {
    const recordDate = new Date(record.timeEntered); // Adjust this based on your data structure
    const matchesDay =
      recordDate.getFullYear() === date.getFullYear() &&
      recordDate.getMonth() === date.getMonth() &&
      recordDate.getDate() === date.getDate();
    if (isStartOfDay) {
      // Filter based on the entire day
      return matchesDay;
    } else {
      // Filter based on the specific datetime
      const matchesTime =
        recordDate.getHours() === date.getHours() &&
        recordDate.getMinutes() === date.getMinutes();

      return matchesDay && matchesTime;
    }
  });
};

dateFilterFn.autoRemove;

export default dateFilterFn;
