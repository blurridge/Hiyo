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
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useState } from "react";
import { User } from "@/types/types";

export const AttendanceForm = () => {
  const form = useForm<attendanceFormType>({
    resolver: zodResolver(attendanceFormSchema),
    mode: "onBlur",
    defaultValues: {
      idNumber: "",
    },
  });

  const { formState, reset, watch } = form;
  const { toast } = useToast();
  const { users, loading } = useUser();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [formValues, setFormValues] = useState<attendanceFormType | undefined>(
    undefined
  );

  const checkIfUserExists = () => {
    const userExists = users.some(
      (user) => user.idNumber === watch("idNumber")
    );
    if (userExists) {
      const user = users.find((user) => user.idNumber === watch("idNumber"));
      setCurrentUser(user);
      setShowDialog(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        description: `A record does not exist for ID ${watch(
          "idNumber"
        )}. Please register first.`,
        title: "❌ ERROR",
      });
      reset({});
      setShowDialog(false);
      setCurrentUser(undefined);
      return false;
    }
  };

  const formatUserInfo = (user: User | undefined) => {
    if (!user) return null;

    const { idNumber, userName, address, contactNumber, email } = user;

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

  const onSubmit = (values: attendanceFormType) => {
    let userExists = checkIfUserExists();
    if (userExists) {
      setFormValues(values);
    } else {
      setFormValues(undefined);
    }
  };

  const handleSubmit = () => {
    axios
      .put("http://localhost:8080/api/user/attendance", formValues)
      .then((response) => {
        // Interpret response to customize the toast message
        let toastMessage = response.data.message;
        if (response.data.action === "timeEnteredRecorded") {
          toastMessage = `Time entered recorded for ${formValues?.idNumber}!`;
        } else if (response.data.action === "timeLeftUpdated") {
          toastMessage = `Time left updated for ${formValues?.idNumber}!`;
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
          description: `An error occurred updating the attendance for ID ${formValues?.idNumber}`,
          title: "❌ ERROR",
        });
      });
    setFormValues(undefined);
    setShowDialog(false);
    setCurrentUser(undefined);
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
        <Button
          className="bg-hiyo-purple hover:bg-dark-purple"
          disabled={!formState.isValid}
          type="submit"
        >
          Submit
        </Button>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to take attendance for {watch("idNumber")}
                ?
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {formatUserInfo(currentUser)}
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
