"use server";

import { API_URL } from "@/lib/constant";
import { getSession } from "./getSession";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function refreshToken() {
  const { refresh_token: refreshToken, access_token } =
    (await getSession()) as LoginResult;
  const currPath = headers().get("x-current-path");

  const response = await fetch(`${API_URL}/auth/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    setSession(data);
    revalidatePath(currPath as string);
  }
}
