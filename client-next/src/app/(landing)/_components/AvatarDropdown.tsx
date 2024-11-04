/**
 * @file AvatarDropdown.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description A dropdown component that displays user avatar and provides user-related actions
 * such as profile editing and logout functionality. It integrates with the authentication
 * system and handles user profile updates through a modal interface.
 */

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/server/auth/logout";
import { User } from "@/types";
import { User as UserIcon, LogOut } from "lucide-react";
import UserModal from "./UserModal";
import { updateUser } from "@/server/user/updateUser";
import { z } from "zod";
import { userUpdateSchema } from "@/server/user/schema";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

// Define the props interface for the AvatarDropdown component
type AvatarDropdownProps = {
  user: User;
};

export default function AvatarDropdown({ user }: AvatarDropdownProps) {
  // State to control the visibility of the user edit modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Initialize the updateUser action hook with toast notifications for different states
  const { executeAsync, isExecuting, result } = useAction(updateUser, {
    // Show loading toast when the update action starts
    onExecute: () => {
      toast.loading("Updating user...");
    },
    // Handle successful update by showing success toast and closing modal
    onSuccess: () => {
      toast.dismiss();
      toast.success("User updated successfully");
      setIsUserModalOpen(false);
    },
    // Handle update failure with error toast
    onError: () => {
      toast.dismiss();
      toast.error("Failed to update user");
    },
  });

  /**
   * Handles the save action from the user modal
   * @param updatedUser - Partial user object containing the fields to update
   */
  const handleUserModalSave = async (
    updatedUser: Partial<z.infer<typeof userUpdateSchema>>
  ) => {
    await executeAsync(updatedUser);
  };

  return (
    <>
      {/* Dropdown menu component */}
      <DropdownMenu>
        {/* Avatar trigger for the dropdown */}
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-10 w-10 border-2 border-primary">
            {/* User avatar image with fallback to initials */}
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
            />
            <AvatarFallback>
              {/* Generate initials from user's first and last name */}
              {(user.firstName as string).charAt(0) +
                (user.lastName as string).charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* Dropdown menu content */}
        <DropdownMenuContent className="w-56" align="end">
          {/* Display user's full name */}
          <DropdownMenuLabel>
            {user.firstName} {user.lastName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Edit profile menu item */}
          <DropdownMenuItem onClick={() => setIsUserModalOpen(true)}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Logout menu item */}
          <DropdownMenuItem
            className="text-red-600"
            onClick={async () => await logOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User edit modal */}
      <UserModal
        user={user}
        isOpen={isUserModalOpen}
        onSave={handleUserModalSave}
        onClose={() => setIsUserModalOpen(false)}
        isSaving={isExecuting}
        // Show error message if there are server or validation errors
        error={
          result?.serverError || result?.validationErrors
            ? "Failed to update user"
            : null
        }
      />
    </>
  );
}