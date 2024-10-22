import { z } from "zod";

export const userUpdateSchema = z.object({
  username: z.string().min(1).max(20).optional(),
  password: z.string().optional(),
  email: z.string().email().optional(),
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().min(1).max(20).optional(),
});
