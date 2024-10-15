"use server";

import { z } from "zod";
import { loginSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { redirect } from "next/navigation";
// import { setSession } from "../session";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

/**
 *
 * @deprecated This one not in use anymore!
 */
export async function loginAction(
  payload: FormData | z.infer<typeof loginSchema>
): Promise<string> {
  let username: string, password: string;
  try {
    if (payload instanceof FormData) {
      const { data, success, error } = loginSchema.safeParse({
        username: payload.get("username"),
        password: payload.get("password"),
      });
      if (!data || !success) {
        throw new Error(error.message);
      }
      username = data.username;
      password = data.password;
    } else {
      username = payload.username;
      password = payload.password;
    }
  } catch (error) {
    throw "Error while parsing the data: " + error;
  }

  try {
    const result = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status !== 200 || !result.ok) {
      throw new Error(`${result.status} ${result.statusText}`);
    }
    const data = (await result.json()) as LoginResult;
    await setSession(data);
    redirect("/");
  } catch (error) {
    throw "Error while logging in: " + error;
  }
}
