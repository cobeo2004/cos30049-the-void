/**
 * @file updateUser.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Handles updating user information with authentication,
 * using defined schemas and fetching methods.
 */

"use server"; // Indicates that this code should run on the server side

import { authAction } from "@/lib/actionClient"; // Import the authenticated action helper
import { userUpdateSchema } from "./schema"; // Import the schema for validating user update input
import { API_URL } from "@/lib/constant"; // Import the base API URL
import { revalidatePath } from "next/cache"; // Import function to revalidate cache for a specific path
import { authFetch } from "@/lib/authFetch"; // Import the authenticated fetch function
import { User } from "@/types"; // Import the User type definition

// Create an authenticated action to update user information
export const updateUser = authAction
  // Attach the input validation schema to the action
  .schema(userUpdateSchema)
  // Define the action handler function
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Perform an authenticated PUT request to update the user information
      const res = await authFetch<User>(`${API_URL}/user/${ctx.user.id}`, {
        options: {
          method: "PUT", // Use HTTP PUT method for updating data
          body: JSON.stringify(parsedInput), // Convert the parsed input to JSON string for the request body
        },
        ctx, // Pass the authentication context
      });
      // Revalidate the cache for the root path to reflect the updated user data
      revalidatePath("/");
      // Return the updated user data
      return res;
    } catch (error) {
      // Throw a new error if the fetch request fails
      throw new Error((error as Error).message);
    }
  });
