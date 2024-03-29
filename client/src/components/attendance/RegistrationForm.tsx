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

  const onSubmit = (values: registrationFormType) => {
    const finalPayload: User = {
      ...values,
      timeEntered: new Date(),
      timeLeft: null,
    };
    axios
      .post("http://localhost:8080/api/", finalPayload)
      .then(function (response) {
        console.log(response);
        toast({
          description: `✅ ${values.idNumber} successfully registered and recorded!`,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: `❌ ERROR: ${values.idNumber} not registered`,
        });
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
