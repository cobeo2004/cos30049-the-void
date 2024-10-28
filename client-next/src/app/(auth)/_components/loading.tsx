import LoadingSpinner from "@/components/ui/loading-spinner";
import React from "react";

function LoadingComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );
}

export default LoadingComponent;
