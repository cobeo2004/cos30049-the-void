"use server";

import { API_URL } from "@/lib/constant";
import { User } from "@/types";
import { authAction } from "@/lib/actionClient";
import { z } from "zod";

export const getUserById = authAction
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ ctx }) => {
    try {
      const res = await fetch(`${API_URL}/user/${ctx.user.id}`, {
        headers: {
          Authorization: `Bearer ${ctx.access_token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return (await res.json()) as User;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });
