/**
 * @file signIn.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Handles user authentication through the sign-in process.
 * Validates credentials, manages session creation, and handles cache revalidation.
 */

"use server";

// Import required utilities and types for authentication
import { unauthAction } from "@/lib/actionClient";
import { loginSchema } from "./schema";
import { API_URL } from "@/lib/constant";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { revalidatePath } from "next/cache";

/**
 * Server action to handle user sign-in process
 * 
 * @function signIn
 * @async
 * @param {Object} params - The parameters object containing parsed input
 * @param {Object} params.parsedInput - Validated login credentials
 * @returns {Promise<LoginResult>} Promise containing login result data
 * 
 * @description
 * This function handles the complete sign-in flow:
 * 1. Validates input credentials using loginSchema
 * 2. Makes API request to authentication endpoint
 * 3. Creates user session on successful authentication
 * 4. Revalidates cached data
 * 5. Returns login result
 * 
 * @throws {Error} Throws error if authentication fails
 */
export const signIn = unauthAction
  // Apply validation schema to ensure input credentials meet requirements
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    // Make API request to authentication endpoint
    const res = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify(parsedInput),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle authentication failures
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    // Parse and type-cast authentication response
    const data = (await res.json()) as LoginResult;

    // Create session with authentication tokens
    setSession(data);

    // Revalidate cached data to reflect authenticated state
    revalidatePath("/");

    // Return authentication result
    return data;
  });