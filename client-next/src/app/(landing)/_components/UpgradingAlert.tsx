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

export default function UpgradingAlert({
  showAlert,
  setShowAlert,
}: {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Social Media Update</AlertDialogTitle>
          <AlertDialogDescription>
            We are currently upgrading our social media presence. Please check
            back later!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-blue-500">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
