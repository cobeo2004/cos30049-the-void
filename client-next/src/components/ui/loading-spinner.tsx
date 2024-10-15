import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="inline-block size-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-600 dark:text-gray-200"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
