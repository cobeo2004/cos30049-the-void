/**
 * @file schema.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Defines the schemas for validating login and signup inputs using the Zod validation library.
 */

import { z } from "zod";

// Schema for validating login input fields
export const loginSchema = z.object({
  // 'username' is a required string with a custom error message for invalid input
  username: z.string({
    message: "Please enter a valid username.",
  }),
  // 'password' is a required string with minimum and maximum length constraints
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .max(16, {
      message: "Password must be at most 16 characters long.",
    }),
});

// Schema for validating signup input fields
export const signupSchema = z.object({
  // 'email' is a required string that must be a valid email format
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  // 'password' is a required string with length constraints
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .max(16, {
      message: "Password must be at most 16 characters long.",
    }),
  // 'firstName' is a required string with a custom error message
  firstName: z.string({
    message: "Please enter a valid first name.",
  }),
  // 'lastName' is a required string with a custom error message
  lastName: z.string({
    message: "Please enter a valid last name.",
  }),
  // 'username' is a required string with a custom error message
  username: z.string({
    message: "Please enter a valid username.",
  }),
});
