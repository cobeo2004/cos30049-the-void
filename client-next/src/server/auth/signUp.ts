"use server";

import { signupSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { unauthAction } from "@/lib/actionClient";
import { revalidatePath } from "next/cache";
import { setSession } from "../session";
import { LoginResult } from "@/types";

export const signUp = unauthAction
  .schema(signupSchema)
  .action(async ({ parsedInput }) => {
    try {
      const res = await fetch(`${API_URL}/auth/signUp`, {
        method: "POST",
        body: JSON.stringify({
          email: parsedInput.email,
          firstName: parsedInput.firstName,
          lastName: parsedInput.lastName,
          username: parsedInput.username,
          password: parsedInput.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to sign up");
      }
      const data = (await res.json()) as LoginResult;

      revalidatePath("/");
      setSession(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to sign up");
    }
  });
