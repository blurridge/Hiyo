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

export type UpdateEnterPayload = {
  idNumber: string;
  timeEntered: Date;
};

export type UpdateExitPayload = {
  idNumber: string;
  timeLeft: Date;
};
