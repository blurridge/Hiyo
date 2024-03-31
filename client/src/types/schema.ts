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
    .min(11, { message: "Contact number must be at least 11 digits." })
    .max(11, { message: "Contact number must be at most 11 digits." }),
  email: z.string().email({ message: "Invalid email address" }),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const registrationAdminFormSchema = z.object({
  idNumber: z
    .string()
    .min(8, { message: "ID number must be at least 8 characters." })
    .max(10, { message: "ID number must be at most 10 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export type attendanceFormType = z.infer<typeof attendanceFormSchema>;
export type registrationFormType = z.infer<typeof registrationFormSchema>;
export type loginFormType = z.infer<typeof loginFormSchema>;
export type registrationAdminFormType = z.infer<
  typeof registrationAdminFormSchema
>;
