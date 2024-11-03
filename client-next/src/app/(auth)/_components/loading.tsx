/**
 * @file loading.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description A reusable loading spinner component that provides visual feedback during loading states,
 * specifically designed for authentication-related pages with customizable size options
 */

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * LoadingComponent - A reusable loading spinner component for auth pages
 *
 *
 * @param {Object} props - Component properties
 * @param {string} [props.className] - Optional CSS classes to merge with default styles
 * @param {('small'|'medium'|'large')} [props.size='large'] - Controls the size of the spinner, defaults to 'large'
 * @returns {JSX.Element} A centered loading spinner component
 */
function LoadingComponent({
  className,
  size = "large",
}: {
  className?: string;
  size?: "small" | "medium" | "large";
}) {
  return (
    // Main container div using Tailwind classes for centering
    // Uses cn() to merge any provided className with the default styles
    <div className={cn(className, "flex justify-center items-center h-screen")}>
      {/* The actual spinner component with the specified size prop */}
      <LoadingSpinner size={size} />
    </div>
  );
}

// Export the component as the default export for importing in other files
export default LoadingComponent;
