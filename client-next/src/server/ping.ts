"use server";

import { API_URL } from "@/lib/constant";
import { redirect } from "next/navigation";

export const ping = async () => {
  const result = await fetch(`${API_URL}/ping`);
  if (!result.ok) {
    redirect("/404");
  }
  console.log("Pinged server");
  return result.json();
};
