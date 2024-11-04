/**
 * @file getSession.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Provides a function to retrieve and validate the user session.
 */

"use server"; // Indicates that this code should run on the server side

import { validateSession } from "../session"; // Import the function to validate the user session

// Asynchronous function to get the current user session
export const getSession = async () => {
  // Await the validation of the session and store the result
  const session = await validateSession();
  // Return the session object, which contains user authentication data
  return session;
};
