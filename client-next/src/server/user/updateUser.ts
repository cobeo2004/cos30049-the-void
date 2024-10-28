"use server";

import { authAction } from "@/lib/actionClient";
import { userUpdateSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/authFetch";
import { User } from "@/types";

export const updateUser = authAction
  .schema(userUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const res = await authFetch<User>(`${API_URL}/user/${ctx.user.id}`, {
        options: {
          method: "PUT",
          body: JSON.stringify(parsedInput),
        },
        ctx,
      });
      revalidatePath("/");
      return res;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });
