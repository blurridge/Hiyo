"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registrationFormType, registrationFormSchema } from "@/types/schema";
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
import axios from "axios";
import { User } from "@/types/types";
import { useUser } from "@/context/UserContext";

export const RegistrationForm = () => {
  const form = useForm<registrationFormType>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      idNumber: "",
      userName: "",
      address: "",
      contactNumber: "",
      email: "",
    },
  });

  const { reset } = form;
  const { toast } = useToast();
  const { users, fetchUsers } = useUser();

  const onSubmit = (values: registrationFormType) => {
    const userExists = users.some((user) => user.idNumber === values.idNumber);
    if (userExists) {
      toast({
        variant: "destructive",
        description: `A record already exists for ID ${values.idNumber}.`,
        title: "ERROR",
      });
    } else {
      axios
        .post("http://localhost:8080/api/", values)
        .then((response) => {
          toast({
            description: `ID ${values.idNumber} successfully registered!`,
            title: "✅ SUCCESS",
          });
          fetchUsers();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            description: `An error occurred updating the attendance for ID ${values.idNumber}`,
            title: "❌ ERROR",
          });
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 18020919@usc.edu.ph" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Juan Dela Cruz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Nasipit, Talamban" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 09xxxxxxxxx" {...field} />
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
