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
import { User as UserIcon, Settings, HelpCircle, LogOut } from "lucide-react";
import UserModal from "./UserModal";
import { updateUser } from "@/server/user/updateUser";
import { z } from "zod";
import { userUpdateSchema } from "@/server/user/schema";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type AvatarDropdownProps = {
  user: User;
};

export default function AvatarDropdown({ user }: AvatarDropdownProps) {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { executeAsync, isExecuting, result } = useAction(updateUser, {
    onExecute: () => {
      toast.loading("Updating user...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("User updated successfully");
      setIsUserModalOpen(false);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Failed to update user");
    },
  });

  const handleUserModalSave = async (
    updatedUser: Partial<z.infer<typeof userUpdateSchema>>
  ) => {
    await executeAsync(updatedUser);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
            />
            <AvatarFallback>
              {(user.firstName as string).charAt(0) +
                (user.lastName as string).charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            {user.firstName} {user.lastName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUserModalOpen(true)}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={async () => await logOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserModal
        user={user}
        isOpen={isUserModalOpen}
        onSave={handleUserModalSave}
        onClose={() => setIsUserModalOpen(false)}
        isSaving={isExecuting}
        error={
          result?.serverError || result?.validationErrors
            ? "Failed to update user"
            : null
        }
      />
    </>
  );
}
