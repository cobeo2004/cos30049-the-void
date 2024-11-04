/**
 * @file ping.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Checks the availability of the API server by sending a ping request
 * and redirects to an error page if the server is unreachable.
 */

"use server"; // Ensure the code runs on the server side

import { API_URL } from "@/lib/constant"; // Import the base API URL constant
import { redirect } from "next/navigation"; // Import the redirect function from Next.js

// Asynchronous function to ping the API server
export const ping = async () => {
  try {
    // Send a GET request to the '/ping' endpoint of the API server
    const result = await fetch(`${API_URL}/ping`);
    // Check if the response status is not OK (i.e., not in the 200–299 range)
    if (!result.ok) {
      // Redirect to the error page if the server did not respond successfully
      redirect("/errors/not-ping");
    }
    // Parse and return the JSON response from the server
    return result.json();
  } catch (error) {
    // Redirect to the error page if there was an error during the fetch operation
    redirect("/errors/not-ping");
  }
};
