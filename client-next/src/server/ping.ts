"use server";

import { API_URL } from "@/lib/constant";
import { redirect } from "next/navigation";

export const ping = async () => {
  console.log("API_URL", API_URL);
  const result = await fetch(`${API_URL}/ping`);
  if (!result.ok) {
    redirect("/errors/not-ping");
  }
  return result.json();
};
