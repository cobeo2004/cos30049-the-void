/**
 * @file UpgradingAlert.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description A reusable alert dialog component that displays a message about 
 * social media updates. This component uses the shadcn/ui AlertDialog components
 * to create a modal dialog with a consistent design pattern.
 */

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import React from "react";

/**
 * Interface for the UpgradingAlert component props
 * @interface
 * @property {boolean} showAlert - Controls the visibility of the alert dialog
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShowAlert - State setter function to control alert visibility
 */
type UpgradingAlertProps = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Alert dialog component that shows a message about social media updates
 * Uses shadcn/ui's AlertDialog components for consistent styling and accessibility
 * 
 * @param {UpgradingAlertProps} props - Component props
 * @param {boolean} props.showAlert - Controls dialog visibility
 * @param {Function} props.setShowAlert - Function to update dialog visibility state
 * @returns {JSX.Element} A modal dialog component
 */
export default function UpgradingAlert({
  showAlert,
  setShowAlert,
}: UpgradingAlertProps) {
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      {/* Main content container for the alert */}
      <AlertDialogContent>
        {/* Header section containing title and description */}
        <AlertDialogHeader>
          {/* Alert title */}
          <AlertDialogTitle>Social Media Update</AlertDialogTitle>
          {/* Alert message */}
          <AlertDialogDescription>
            We are currently upgrading our social media presence. Please check
            back later!
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Footer section with action button */}
        <AlertDialogFooter>
          <AlertDialogAction className="bg-blue-500">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}