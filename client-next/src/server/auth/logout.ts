"use server";

import { headers } from "next/headers";
import { deleteSession } from "../session";
import { redirect } from "next/navigation";

export async function logOut() {
  console.log("logOut");
  const currPath = headers().get("x-current-path");
  deleteSession();
  redirect(currPath as string);
}
