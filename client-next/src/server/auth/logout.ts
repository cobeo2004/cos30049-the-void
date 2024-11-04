/**
 * @file logout.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Handles user logout process by clearing session data and redirecting
 * to the home page. This action ensures secure session termination.
 */

"use server";

// Import required utilities for session management and navigation
import { deleteSession } from "../session";
import { redirect } from "next/navigation";
import { authAction } from "@/lib/actionClient";

/**
 * Server action to handle user logout process
 * 
 * @function logOut
 * @async
 * @returns {void} Redirects to home page after logout
 * 
 * @description
 * This function manages the complete logout flow:
 * 1. Requires authentication to ensure only logged-in users can logout
 * 2. Deletes all session data including authentication tokens
 * 3. Redirects user to the home page
 * 
 * Security considerations:
 * - Uses authAction to ensure the action is only accessible to authenticated users
 * - Completely removes session data to prevent unauthorized access
 * - Immediate redirect prevents any post-logout actions
 */
export const logOut = authAction.action(async () => {
  // Remove all session data including authentication tokens
  deleteSession();

  // Redirect to home page after successful logout
  redirect("/");
});