"use server";
import { deleteSession } from "../session";
import { redirect } from "next/navigation";

export async function logOut() {
  console.log("logOut");
  deleteSession();
  redirect("/");
}
