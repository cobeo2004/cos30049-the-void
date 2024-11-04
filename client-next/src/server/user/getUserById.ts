/**
 * @file getUserById.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Handles fetching a user's information by their ID with authentication,
 * using defined schemas and fetching methods.
 */

"use server"; // Indicates that this code should run on the server side

import { API_URL } from "@/lib/constant"; // Import the base API URL
import { User } from "@/types"; // Import the User type definition
import { authAction } from "@/lib/actionClient"; // Import the authenticated action helper
import { z } from "zod"; // Import Zod for schema validation
import { authFetch } from "@/lib/authFetch"; // Import the authenticated fetch function

// Create an authenticated action to get user information by ID
export const getUserById = authAction
  // Attach the input validation schema to the action
  .schema(
    z.object({
      // 'id' is a required string representing the user's ID
      id: z.string(),
    })
  )
  // Define the action handler function
  .action(async ({ ctx }) => {
    try {
      // Perform an authenticated GET request to fetch user data by ID
      return await authFetch<User>(`${API_URL}/user/${ctx.user.id}`, {
        options: {
          method: "GET", // Use HTTP GET method for fetching data
        },
        ctx, // Pass the authentication context
      });
    } catch (error) {
      // Throw a new error if the fetch request fails
      throw new Error((error as Error).message);
    }
  });
