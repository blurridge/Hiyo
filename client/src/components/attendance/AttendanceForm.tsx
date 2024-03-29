"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { attendanceFormType, attendanceFormSchema } from "@/types/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useUser } from "@/context/UserContext";
import axios from "axios";

export const AttendanceForm = () => {
  const form = useForm<attendanceFormType>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      idNumber: "",
    },
  });

  const { reset } = form;
  const { toast } = useToast();
  const { users, loading } = useUser();

  const onSubmit = (values: attendanceFormType) => {
    const userExists = users.some((user) => user.idNumber === values.idNumber);
    if (userExists) {
      axios
        .put("http://localhost:8080/api/", values)
        .then((response) => {
          // Interpret response to customize the toast message
          let toastMessage = response.data.message;
          if (response.data.action === "timeEnteredRecorded") {
            toastMessage = `Time entered recorded for ${values.idNumber}!`;
          } else if (response.data.action === "timeLeftUpdated") {
            toastMessage = `Time left updated for ${values.idNumber}!`;
          }

          toast({
            description: toastMessage,
            title: response.data.status ? "✅ SUCCESS" : "❌ ERROR",
            variant: response.data.status ? "default" : "destructive",
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            description: `An error occurred updating the attendance for ID ${values.idNumber}`,
            title: "❌ ERROR",
          });
        });
    } else {
      toast({
        variant: "destructive",
        description: `A record does not exist ID ${values.idNumber}. Please register first.`,
        title: "❌ ERROR",
      });
    }
    reset({});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 18020919" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-hiyo-purple hover:bg-dark-purple" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
