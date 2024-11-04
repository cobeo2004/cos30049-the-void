/**
 * @file signup/page.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description This file contains the implementation of the signup page for the AviAI application.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/image.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupSchema } from "@/server/auth/schema";
// import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAction } from "next-safe-action/hooks";
import { signUp } from "@/server/auth/signUp";

export default function Signup() {
  // Initialize the router for navigation
  const router = useRouter();
  // Initialize the form with default values and schema validation
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Utilize the useAction hook to manage the state of the signUp action
  const signUpMutation = useAction(signUp, {
    onExecute: () => {
      // Display a loading toast when the signup action is executed
      toast.loading("Signing up...");
    },
    onSuccess: () => {
      // After successful signup, prefetch the home page and redirect the user
      router.prefetch("/");
      router.push("/");
      toast.dismiss();
    },
    onError: () => {
      // Display an error message if signup fails
      toast.dismiss();
      toast.error("Signup failed");
    },
    onSettled: () => {
      // Dismiss the loading toast when the action is settled
      toast.dismiss();
    },
  });

  // Function to handle form submission by executing the signUp action
  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    await signUpMutation.executeAsync(values);
  };

  // Extract the signup error from the result
  const loginErr =
    signUpMutation.result.serverError ||
    signUpMutation.result.validationErrors ||
    signUpMutation.result.bindArgsValidationErrors;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <Link href="/" className="flex flex-col items-center">
              <Image src={logo} alt="AviAI Logo" width={150} height={150} />
            </Link>
            Sign up for <span className="text-blue-500">AviAI.</span>
          </CardTitle>
          <CardDescription className="text-center">
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="johndoe" {...field} />
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
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {signUpMutation.hasErrored && (
                <div className="flex items-center space-x-2 text-red-500">
                  <AlertCircle size={16} />
                  <span className="text-sm">{loginErr as string}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button
                type="submit"
                className="w-full"
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending ? <LoadingSpinner /> : "Sign up"}
              </Button>
              <span className="text-sm text-gray-500 pt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </span>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
