"use server";
import { deleteSession } from "../session";
import { redirect } from "next/navigation";
import { authAction } from "@/lib/actionClient";

export const logOut = authAction.action(async () => {
  deleteSession();
  redirect("/");
});
