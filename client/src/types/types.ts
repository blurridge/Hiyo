export type User = {
  idNumber: string;
  userName: string;
  address: string;
  contactNumber: string;
  email: string;
  timeEntered: Date | null;
  timeLeft: Date | null;
};

export type Attendance = {
  idNumber: string;
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
