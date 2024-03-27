type User = {
  idNumber: string;
  userName: string;
  address: string;
  contactNumber: string;
  email: string;
};

type Attendance = {
  idNumber: string;
  timeEntered: Date;
  timeLeft: Date;
};

type UpdateEnterPayload = {
  idNumber: string;
  timeEntered: Date;
};

type UpdateExitPayload = {
  idNumber: string;
  timeLeft: Date;
};
