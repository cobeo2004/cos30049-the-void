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
import { loginSchema } from "@/server/auth/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useAction } from "next-safe-action/hooks";
import { signIn } from "@/server/auth/signIn";

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const loginMutation = useMutation({
  //   mutationFn: async (values: z.infer<typeof loginSchema>) => {
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       body: JSON.stringify(values),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok || response.status !== 200) {
  //       throw new Error(`${response.statusText}`);
  //     }
  //     return response;
  //   },
  //   onMutate: () => {
  //     toast.loading("Logging in...");
  //   },
  //   onSuccess: () => {
  //     router.prefetch("/");
  //     router.push("/");
  //     toast.dismiss();
  //   },
  //   onError: () => {
  //     toast.dismiss();
  //     toast.error("Login failed");
  //   },
  //   onSettled: () => {
  //     toast.dismiss();
  //   },
  // });

  const { isExecuting, executeAsync, result, hasErrored } = useAction(signIn, {
    onExecute: () => {
      toast.loading("Logging in...");
    },
    onSuccess: () => {
      router.prefetch("/");
      router.push("/");
      toast.dismiss();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Login failed");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  const loginErr =
    result.serverError ||
    result.validationErrors ||
    result.bindArgsValidationErrors;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await executeAsync(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#FFF8F8] from-0% via-[#8BDFFF] via-53% to-[#18BFFF] to-100% p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            <Link href="/" className="flex flex-col items-center">
              <Image src={logo} alt="AviAI Logo" width={150} height={150} />
            </Link>
            Login to <span className="text-blue-500">AviAI.</span>
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
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
              {hasErrored && (
                <div className="flex items-center space-x-2 text-red-500">
                  <AlertCircle size={16} />
                  <span className="text-sm">{loginErr as string}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button type="submit" className="w-full" disabled={isExecuting}>
                {isExecuting ? <LoadingSpinner /> : "Log in"}
              </Button>
              <span className="text-sm text-gray-500 pt-4">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </span>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
