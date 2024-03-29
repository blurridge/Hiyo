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


export const AttendanceForm = () => {
  const form = useForm<attendanceFormType>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      idNumber: "",
    },
  });

  const { reset } = form;
  const { toast } = useToast();

  const onSubmit = (values: attendanceFormType) => {
    console.log(values);
    toast({
      description: `✅ Attendance recorded for ${values.idNumber}!`
    });
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
