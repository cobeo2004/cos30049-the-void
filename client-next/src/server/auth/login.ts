"use server";

import { z } from "zod";
import { loginSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { redirect } from "next/navigation";

type Result = {
  isError: boolean;
  error?: string;
  success?: string;
  data?: LoginResult;
};

export async function loginAction(
  payload: z.infer<typeof loginSchema> | FormData
): Promise<Result> {
  try {
    let username: string, password: string;
    if (payload instanceof FormData) {
      username = payload.get("username") as string;
      password = payload.get("password") as string;
    } else {
      username = payload.username;
      password = payload.password;
    }

    const result = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status !== 200 || !result.ok) {
      throw new Error(result.statusText);
    } else {
      const data = (await result.json()) as LoginResult;
      console.log(data.access_token);
      setSession(data);
      redirect("/");
    }
  } catch (error) {
    throw error;
  }
}
