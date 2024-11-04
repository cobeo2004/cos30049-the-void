/**
 * @file refreshToken.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Handles the token refresh process to maintain user authentication.
 * Retrieves new access tokens using refresh token when the current access token expires.
 */

"use server";

// Import required utilities and types for token refresh
import { API_URL } from "@/lib/constant";
import { getSession } from "./getSession";
import { LoginResult } from "@/types";
import { setSession } from "../session";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/authFetch";

/**
 * Refreshes the authentication tokens for the current session
 * 
 * @function refreshToken
 * @async
 * 
 * @description
 * This function manages the token refresh flow:
 * 1. Retrieves current session data including both tokens
 * 2. Gets the current path for cache revalidation
 * 3. Makes authenticated request to refresh token endpoint
 * 4. Updates session with new tokens
 * 5. Revalidates the current page cache
 * 
 * Flow details:
 * - Extracts refresh token from current session
 * - Makes API call to get new tokens
 * - Updates session cookies with new tokens
 * - Revalidates cached data for the current path
 * 
 * @throws {Error} Implicitly throws if session is invalid or refresh fails
 */
export async function refreshToken() {
  // Extract refresh token and access token from current session
  // Type assertion ensures we have required token properties
  const { refresh_token: refreshToken, access_token } =
    (await getSession()) as LoginResult;

  // Get current path from request headers for cache revalidation
  const currPath = headers().get("x-current-path");

  // Make authenticated request to refresh token endpoint
  const response = await authFetch(`${API_URL}/auth/refreshToken`, {
    options: {
      method: "POST",
      body: JSON.stringify({ refreshToken }), // Send current refresh token
    },
    ctx: {
      access_token: access_token, // Include current access token for authentication
    },
  });

  // Update session with new tokens
  setSession(response as LoginResult);

  // Revalidate the cache for current path to reflect new session state
  revalidatePath(currPath as string);
}