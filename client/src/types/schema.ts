import { z } from "zod";

export const attendanceFormSchema = z.object({
  idNumber: z
    .string()
    .min(8, { message: "ID number must be at least 8 characters." })
    .max(10, { message: "ID number must be at most 10 characters." }),
});

export const registrationFormSchema = z.object({
  idNumber: z
    .string()
    .min(8, { message: "ID number must be at least 8 characters." })
    .max(10, { message: "ID number must be at most 10 characters." }),
  userName: z
    .string()
    .min(1, { message: "Name must be at least 1 character." })
    .max(255, { message: "ID number must be at most 255 characters." }),
  address: z
    .string()
    .min(1, { message: "Address must be at least 1 character." })
    .max(255, { message: "Address must be at most 255 characters." }),
  contactNumber: z
    .string()
    .min(11, { message: "Contact number must be at least 11 digits." }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type attendanceFormType = z.infer<typeof attendanceFormSchema>;
export type registrationFormType = z.infer<typeof registrationFormSchema>;
