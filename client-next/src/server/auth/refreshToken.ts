"use server";

import { API_URL } from "@/lib/constant";
import { getSession } from "./getSession";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/authFetch";

export async function refreshToken() {
  const { refresh_token: refreshToken, access_token } =
    (await getSession()) as LoginResult;
  const currPath = headers().get("x-current-path");

  const response = await authFetch(`${API_URL}/auth/refreshToken`, {
    options: {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    },
    ctx: {
      access_token: access_token,
    },
  });

  setSession(response as LoginResult);
  revalidatePath(currPath as string);
}
