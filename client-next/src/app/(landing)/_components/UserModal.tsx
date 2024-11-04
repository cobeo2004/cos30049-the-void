/**
 * @file UserModal.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the UserModal component for editing user information with validation and form handling.
 */

import React from "react"; // Import React library
import { User } from "@/types"; // Import User type definition
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Import dialog components
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input"; // Import Input component
import { userUpdateSchema } from "@/server/user/schema"; // Import validation schema
import { useForm } from "react-hook-form"; // Import useForm hook for form handling
import { zodResolver } from "@hookform/resolvers/zod"; // Import resolver for Zod schemas
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import form components
import { z } from "zod"; // Import Zod library for schema validation

// Define the props interface for the UserModal component
interface UserModalProps {
  user: User; // The user object containing current user data
  isOpen: boolean; // Boolean flag to control modal visibility
  onSave: (updatedUser: Partial<z.infer<typeof userUpdateSchema>>) => void; // Function to handle saving user data
  onClose: () => void; // Function to handle closing the modal
  isSaving: boolean; // Boolean flag to indicate saving state
  error: string | null; // Error message to display if any
}

// Define the UserModal component
const UserModal: React.FC<UserModalProps> = ({
  user,
  isOpen,
  onSave,
  onClose,
  isSaving,
  error,
}) => {
  // Initialize the form with default values and validation schema
  const form = useForm({
    resolver: zodResolver(userUpdateSchema), // Use Zod schema for validation
    defaultValues: {
      email: user.email || "", // Set default email value
      firstName: user.firstName || "", // Set default first name
      lastName: user.lastName || "", // Set default last name
      username: user.username || "", // Set default username
      password: user.password || "", // Password is optional
    },
  });

  // Handler function for form submission
  const handleSubmit = (values: Partial<z.infer<typeof userUpdateSchema>>) => {
    onSave(values); // Invoke the onSave callback with updated values
  };

  return (
    // Render the dialog component
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
        </DialogHeader>
        {/* Form component for handling form state and validation */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)} // Attach form submission handler
            className="space-y-4"
          >
            {/* Email input field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" /> {/* Email input */}
                  </FormControl>
                  <FormMessage /> {/* Display validation message if any */}
                </FormItem>
              )}
            />
            {/* First name input field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} /> {/* First name input */}
                  </FormControl>
                  <FormMessage /> {/* Display validation message if any */}
                </FormItem>
              )}
            />
            {/* Last name input field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} /> {/* Last name input */}
                  </FormControl>
                  <FormMessage /> {/* Display validation message if any */}
                </FormItem>
              )}
            />
            {/* Username input field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} /> {/* Username input */}
                  </FormControl>
                  <FormMessage /> {/* Display validation message if any */}
                </FormItem>
              )}
            />
            {/* Password input field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="(optional)" // Indicate that this field is optional
                    /> {/* Password input */}
                  </FormControl>
                  <FormMessage /> {/* Display validation message if any */}
                </FormItem>
              )}
            />
            {/* Display error message if exists */}
            {error && <p className="text-red-500">{error}</p>}
            {/* Dialog footer with the save button */}
            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save changes"} {/* Button label changes based on saving state */}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal; // Export the UserModal component
