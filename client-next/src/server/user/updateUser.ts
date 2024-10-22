"use server";

import { authAction } from "@/lib/actionClient";
import { userUpdateSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { revalidatePath } from "next/cache";

export const updateUser = authAction
  .schema(userUpdateSchema)
  .action(async ({ ctx, parsedInput }) => {
    const res = await fetch(`${API_URL}/user/${ctx.user.id}`, {
      method: "PUT",
      body: JSON.stringify(parsedInput),
      headers: {
        Authorization: `Bearer ${ctx.access_token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    revalidatePath("/");
    return await res.json();
  });
