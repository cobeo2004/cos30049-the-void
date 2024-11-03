/**
 * @file session.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Handles session management including creation, validation, deletion,
 * and authentication checks. Uses HTTP-only cookies for secure token storage.
 */

// Ensure this code only runs on the server side
import "server-only";

// Import necessary dependencies for session management
import { API_URL } from "@/lib/constant";
import { LoginResult, User } from "@/types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "./auth/getSession";

/**
 * Sets session cookies after successful authentication
 * 
 * @function setSession
 * @async
 * @param {Partial<LoginResult>} data - Object containing access and refresh tokens
 * 
 * @description
 * Stores authentication tokens in HTTP-only cookies:
 * - access_token: Used for API authentication
 * - refresh_token: Used to obtain new access tokens
 */
export async function setSession(data: Partial<LoginResult>) {
  cookies().set("access_token", data.access_token as string);
  cookies().set("refresh_token", data.refresh_token as string);
}

/**
 * Validates the current session by checking token validity
 * 
 * @function validateSession
 * @async
 * @returns {Promise<LoginResult | null>} Session data if valid, null otherwise
 * 
 * @description
 * Validates session through following steps:
 * 1. Checks for presence of both tokens in cookies
 * 2. Verifies access token validity with auth/me endpoint
 * 3. Returns full session data if valid, null if any step fails
 */
export async function validateSession(): Promise<LoginResult | null> {
  // Retrieve tokens from cookies
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  // Return null if either token is missing
  if (!accessToken || !refreshToken) {
    return null;
  }

  // Validate access token by making API request to auth/me endpoint
  const result = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Return null if API request fails
  if (!result.ok) {
    return null;
  }

  // Parse and type-cast user data from response
  const res = (await result.json()) as User;

  // Return complete session data if all validations pass
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: res,
  };
}

/**
 * Deletes the current session by removing authentication cookies
 * 
 * @function deleteSession
 * @async
 * 
 * @description
 * Removes both access and refresh token cookies, effectively logging out the user
 */
export async function deleteSession() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
}

/**
 * Authentication middleware for protected routes
 * 
 * @function auth
 * @async
 * @param {string} [redirectTo] - Optional URL to redirect to if authentication fails
 * @returns {Promise<LoginResult>} Session data if authentication succeeds
 * 
 * @description
 * Protects routes by:
 * 1. Checking for valid session
 * 2. Redirecting to login page (or specified URL) if no valid session exists
 * 3. Returning session data if authentication succeeds
 */
export async function auth(redirectTo?: string) {
  const session = await getSession();
  if (!session) {
    // Redirect to login page or specified URL if no valid session exists
    redirect(redirectTo ?? "/login");
  }
  return session;
}