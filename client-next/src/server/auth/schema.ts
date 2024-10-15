import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({
    message: "Please enter a valid username.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .max(16, {
      message: "Password must be at most 16 characters long.",
    }),
});

export const signupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .max(16, {
      message: "Password must be at most 16 characters long.",
    }),
  firstName: z.string({
    message: "Please enter a valid first name.",
  }),
  lastName: z.string({
    message: "Please enter a valid last name.",
  }),
  username: z.string({
    message: "Please enter a valid username.",
  }),
});
