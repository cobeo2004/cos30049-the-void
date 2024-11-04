/**
 * @file signUp.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Handles user registration by sending sign-up data to the API,
 * sets up user session upon successful registration, and revalidates the homepage.
 */

"use server"; // Indicates that this code should run on the server side

import { signupSchema } from "./schema"; // Import the schema for validating sign-up input
import { API_URL } from "@/lib/constant"; // Import the base API URL constant
import { unauthAction } from "@/lib/actionClient"; // Import the unauthenticated action helper
import { revalidatePath } from "next/cache"; // Import function to revalidate cache for a specific path
import { setSession } from "../session"; // Import the function to set user session
import { LoginResult } from "@/types"; // Import the LoginResult type definition

// Create an unauthenticated action to handle user sign-up
export const signUp = unauthAction
  // Attach the input validation schema to the action
  .schema(signupSchema)
  // Define the action handler function
  .action(async ({ parsedInput }) => {
    try {
      // Send a POST request to the sign-up API endpoint with user registration data
      const res = await fetch(`${API_URL}/auth/signUp`, {
        method: "POST", // Use HTTP POST method to send data
        body: JSON.stringify({
          // Convert the parsed input to JSON string for the request body
          email: parsedInput.email,
          firstName: parsedInput.firstName,
          lastName: parsedInput.lastName,
          username: parsedInput.username,
          password: parsedInput.password,
        }),
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
      });

      // Check if the response status is not OK (i.e., not in the 200–299 range)
      if (!res.ok) {
        // Throw an error if the sign-up request failed
        throw new Error("Failed to sign up");
      }

      // Parse and cast the JSON response to the LoginResult type
      const data = (await res.json()) as LoginResult;

      // Revalidate the cache for the root path to reflect any changes
      revalidatePath("/");

      // Set up the user session with the received login data
      setSession(data);

      // Return the login data
      return data;
    } catch (error) {
      // If the error is an instance of Error, throw a new error with its message
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      // Throw a generic error message if the error is of a different type
      throw new Error("Failed to sign up");
    }
  });
