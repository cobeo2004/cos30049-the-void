"use server";

import { validateSession } from "../session";
import { LoginResult } from "@/types";

export async function getSession(): Promise<LoginResult | null> {
  const session = await validateSession();
  return session;
}
