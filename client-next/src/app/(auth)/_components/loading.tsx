import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import React from "react";

function LoadingComponent({
  className,
  size = "large",
}: {
  className?: string;
  size?: "small" | "medium" | "large";
}) {
  return (
    <div className={cn(className, "flex justify-center items-center h-screen")}>
      <LoadingSpinner size={size} />
    </div>
  );
}

export default LoadingComponent;
