export type User = {
  idNumber: string;
  userName: string;
  address: string;
  contactNumber: string;
  email: string;
  timeEntered: Date | null;
  timeLeft: Date | null;
  attendance: Attendance[];
};

export type Attendance = {
  attendanceId: string;
  timeEntered: Date;
  timeLeft: Date;
};

export type AdminRequestUser = {
  idNumber: string;
  email: string;
};
