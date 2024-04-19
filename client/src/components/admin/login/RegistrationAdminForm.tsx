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
import {
  registrationAdminFormType,
  registrationAdminFormSchema,
} from "@/types/schema";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useRequests } from "@/context/RequestContext";
import { useState } from "react";

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

  const { formState, reset, watch } = form;
  const { register } = useAuth();
  const { toast } = useToast();
  const { requests, fetchRequests } = useRequests();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<
    registrationAdminFormType | undefined
  >(undefined);

  const formatRequestInfo = () => {
    if (!formValues) return null;

    const { idNumber, email } = formValues;

    return (
      <div>
        <p>
          <strong>ID Number:</strong> {idNumber}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    );
  };

  const checkIfRequestExists = () => {
    const requestExists = requests.some(
      (request) => request.idNumber === watch("idNumber")
    );
    if (!requestExists) {
      setShowDialog(true);
      return true;
    } else {
      toast({
        variant: "destructive",
        description: `A request already exists for ID ${watch(
          "idNumber"
        )}. Please wait for feedback.`,
        title: "❌ ERROR",
      });
      reset({});
      setShowDialog(false);
      return false;
    }
  };

  const onSubmit = (values: registrationAdminFormType) => {
    let requestExists = checkIfRequestExists();
    if (requestExists) {
      setFormValues(values);
    } else {
      setFormValues(undefined);
    }
  };

  const handleSubmit = async () => {
    if (formValues) {
      let registrationStatus: boolean = await register(formValues);
      if (registrationStatus) {
        toast({
          description: `Registration submitted for ${formValues.idNumber}. Please wait for approval.`,
          title: "✅ SUCCESS",
        });
      } else {
        toast({
          description: `Registration error for ${formValues.idNumber}. Make sure you are registered or account is not yet admin.`,
          title: "❌ ERROR",
          variant: "destructive",
        });
      }
    }
    setFormValues(undefined);
    setShowDialog(false);
    reset({});
    fetchRequests();
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
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to register with the following details?
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {formatRequestInfo()}
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
