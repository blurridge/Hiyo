"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  registrationAdminFormType,
  registrationAdminFormSchema,
} from "@/types/schema";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const RegistrationAdminForm = () => {
  const form = useForm<registrationAdminFormType>({
    resolver: zodResolver(registrationAdminFormSchema),
    mode: "onBlur",
    defaultValues: {
      idNumber: "",
      email: "",
      password: "",
    },
  });

  const { formState, reset } = form;
  const { register } = useAuth();
  const { toast } = useToast();

  const onSubmit = (values: registrationAdminFormType) => {
    let registrationStatus: boolean = register(values);
    if (registrationStatus) {
      toast({
        description: `Registration submitted for ${values.idNumber}. Please wait for approval.`,
        title: "✅ SUCCESS",
      });
    } else {
      toast({
        description: `Registration error for ${values.idNumber}.`,
        title: "❌ ERROR",
        variant: "destructive",
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-hiyo-purple hover:bg-dark-purple"
          type="submit"
          disabled={!formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
