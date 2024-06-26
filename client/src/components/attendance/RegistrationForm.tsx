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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export const RegistrationForm = () => {
  const form = useForm<registrationFormType>({
    resolver: zodResolver(registrationFormSchema),
    mode: "onBlur",
    defaultValues: {
      idNumber: "",
      userName: "",
      barangay: "",
      city: "",
      province: "",
      contactNumber: "",
      email: "",
    },
  });

  const { formState, reset, watch, setValue } = form;
  const { toast } = useToast();
  const { users, fetchUsers } = useUser();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [guest, setGuest] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<
    registrationFormType | undefined
  >(undefined);

  useEffect(() => {
    if (guest) {
      const uniqueID = getUniqueID();
      setValue("idNumber", uniqueID);
    } else {
      setValue("idNumber", "");
    }
  }, [guest]);

  const formatUserInfo = () => {
    if (!formValues) return null;

    const {
      idNumber,
      userName,
      barangay,
      city,
      province,
      contactNumber,
      email,
    } = formValues;
    const address = `${barangay}, ${city}, ${province}`;

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

  const getUniqueID = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    if (!formValues) return null;
    const {
      idNumber,
      userName,
      barangay,
      city,
      province,
      contactNumber,
      email,
    } = formValues;
    const address = `${barangay}, ${city}, ${province}`;
    const registrationPayload = {
      idNumber,
      userName,
      address,
      contactNumber,
      email,
    };
    axios
      .post("http://localhost:8080/api/user/register", registrationPayload)
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
        <div className="flex items-center gap-2">
          <Checkbox onClick={() => setGuest(!guest)} id="guest" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="guest"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Guest?
            </label>
          </div>
        </div>
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 18020919"
                  disabled={guest}
                  {...field}
                />
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
          name="barangay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barangay</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Barangay Talamban" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Town</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Cebu City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Cebu" {...field} />
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
