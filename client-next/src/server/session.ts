import "server-only";
import { API_URL } from "@/lib/constant";
import { LoginResult, User } from "@/types";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { getSession } from "./auth/getSession";

export async function setSession(data: LoginResult) {
  cookies().set("access_token", data.access_token);
  cookies().set("refresh_token", data.refresh_token);
}

export async function validateSession(): Promise<LoginResult | null> {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;
  if (!accessToken || !refreshToken) {
    return null;
  }
  const result = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!result.ok) {
    return null;
  }
  const res = (await result.json()) as User;
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: res,
  };
}

export async function deleteSession() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
}

export async function auth() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
