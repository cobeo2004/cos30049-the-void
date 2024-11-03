/**
 * @file schema.ts
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the validation schema for user profile updates using Zod.
 * All fields are optional to allow partial updates of user information.
 */

// Import Zod library for runtime type checking and validation
import { z } from "zod";

/**
 * Validation schema for user profile updates
 * 
 * @constant userUpdateSchema
 * @type {z.ZodObject}
 * 
 * @description
 * Defines the validation rules for user profile updates with the following fields:
 * - All fields are optional to support partial updates
 * - Each field has specific validation rules for data integrity
 * 
 * Schema structure:
 * - username: Optional string, 1-20 characters
 * - password: Optional string, no length restrictions
 * - email: Optional string, must be valid email format
 * - firstName: Optional string, 1-20 characters
 * - lastName: Optional string, 1-20 characters
 */
export const userUpdateSchema = z.object({
  // Username validation: 1-20 characters if provided
  username: z.string()
    .min(1, "Username must not be empty")
    .max(20, "Username must not exceed 20 characters")
    .optional(),

  // Password validation: any valid string if provided
  // No specific requirements set for password complexity
  password: z.string().optional(),

  // Email validation: must be valid email format if provided
  email: z.string()
    .email("Invalid email format")
    .optional(),

  // First name validation: 1-20 characters if provided
  firstName: z.string()
    .min(1, "First name must not be empty")
    .max(20, "First name must not exceed 20 characters")
    .optional(),

  // Last name validation: 1-20 characters if provided
  lastName: z.string()
    .min(1, "Last name must not be empty")
    .max(20, "Last name must not exceed 20 characters")
    .optional(),
});