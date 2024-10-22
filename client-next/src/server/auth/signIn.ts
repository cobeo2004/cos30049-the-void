"use server";
import { unauthAction } from "@/lib/actionClient";
import { loginSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { revalidatePath } from "next/cache";

export const signIn = unauthAction
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const res = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify(parsedInput),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = (await res.json()) as LoginResult;
    setSession(data);
    revalidatePath("/");
    return data;
  });
