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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

export const RegistrationForm = () => {
  const form = useForm<registrationFormType>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onBlur",
    defaultValues: {
      idNumber: "",
      userName: "",
      address: "",
      contactNumber: "",
      email: "",
    },
  });

  const { formState, reset, watch } = form;
  const { toast } = useToast();
  const { users, fetchUsers } = useUser();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<
    registrationFormType | undefined
  >(undefined);

  const formatUserInfo = () => {
    if (!formValues) return null;

    const { idNumber, userName, address, contactNumber, email } = formValues;

    return (
      <div>
        <p>
          <strong>ID Number:</strong> {idNumber}
        </p>
        <p>
          <strong>Name:</strong> {userName}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Contact Number:</strong> {contactNumber}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    );
  };

  const checkIfUserExists = () => {
    const userExists = users.some(
      (user) => user.idNumber === watch("idNumber")
    );
    if (!userExists) {
      setShowDialog(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        description: `A record already exists for ID ${watch("idNumber")}.`,
        title: "❌ ERROR",
      });
      reset({});
      setShowDialog(false);
      return false;
    }
  };

  const onSubmit = (values: registrationFormType) => {
    let userExists = checkIfUserExists();
    if (userExists) {
      setFormValues(values);
    } else {
      setFormValues(undefined);
    }
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/user/register", formValues)
      .then((response) => {
        toast({
          description: `ID ${formValues?.idNumber} successfully registered!`,
          title: "✅ SUCCESS",
        });
        fetchUsers();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `An error occurred updating the attendance for ID ${formValues?.idNumber}`,
          title: "❌ ERROR",
        });
      });
    setFormValues(undefined);
    setShowDialog(false);
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
        <Button
          className="bg-hiyo-purple hover:bg-dark-purple"
          type="submit"
          disabled={!formState.isValid}
        >
          Submit
        </Button>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to register with the following details?
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {formatUserInfo()}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" className="bg-red-700 hover:bg-red-900">
                  Close
                </Button>
              </DialogClose>
              <Button
                className="bg-hiyo-purple hover:bg-dark-purple"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
