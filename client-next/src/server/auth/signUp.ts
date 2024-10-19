"use server";

import { z } from "zod";
import { signupSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { redirect } from "next/navigation";

export async function signUp(value: FormData | z.infer<typeof signupSchema>) {
  let data: z.infer<typeof signupSchema>;

  if (value instanceof FormData) {
    const {
      data: formData,
      error,
      success,
    } = signupSchema.safeParse({
      email: value.get("email"),
      firstName: value.get("firstName"),
      lastName: value.get("lastName"),
      username: value.get("username"),
      password: value.get("password"),
    });
    if (!success) {
      return {
        error: error.message,
      };
    }

    data = formData;
  } else {
    const { data: formData, error, success } = signupSchema.safeParse(value);
    if (!success) {
      return {
        error: error.message,
      };
    }
    data = formData;
  }

  const { email, firstName, lastName, username, password } = data;
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return {
      error: "Failed to sign up",
    };
  }

  redirect("/");
}
