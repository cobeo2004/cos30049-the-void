import { LoginResult } from "@/types";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const authFetch = async <T>(
  url: string,
  {
    options,
    ctx,
  }: {
    options?: RequestInit;
    ctx: Pick<LoginResult, "access_token">;
  }
) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${ctx.access_token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json();
    if (err && err.detail) {
      throw new Error(err.detail);
    }
    throw new Error(res.statusText);
  }
  return (await res.json()) as T;
};
