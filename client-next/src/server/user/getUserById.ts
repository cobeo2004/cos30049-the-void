"use server";

import { API_URL } from "@/lib/constant";
import { User } from "@/types";
import { authAction } from "@/lib/actionClient";
import { z } from "zod";
import { authFetch } from "@/lib/authFetch";

export const getUserById = authAction
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ ctx }) => {
    try {
      return await authFetch<User>(`${API_URL}/user/${ctx.user.id}`, {
        options: {
          method: "GET",
        },
        ctx,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });
