import "server-only";
import { API_URL } from "@/lib/constant";
import { LoginResult, User } from "@/types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "./auth/getSession";

export async function setSession(data: Partial<LoginResult>) {
  cookies().set("access_token", data.access_token as string);
  cookies().set("refresh_token", data.refresh_token as string);
}

export async function validateSession(): Promise<LoginResult | null> {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;
  if (!accessToken || !refreshToken) {
    console.log("no access token or refresh token");
    return null;
  }
  const result = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!result.ok) {
    console.log("result not ok");
    return null;
  }
  const res = (await result.json()) as User;
  console.log("result is ok");
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

export async function auth(redirectTo?: string) {
  const session = await getSession();
  if (!session) {
    redirect(redirectTo ?? "/login");
  }
  return session;
}
