"use server";

import { API_URL } from "@/lib/constant";
import { redirect } from "next/navigation";

export const ping = async () => {
  try {
    const result = await fetch(`${API_URL}/ping`);
    if (!result.ok) {
      redirect("/errors/not-ping");
    }
    return result.json();
  } catch (error) {
    redirect("/errors/not-ping");
  }
};
