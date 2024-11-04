/**
 * @file layout.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description A layout component that implements React Suspense for handling loading states
 * during component rendering. This layout wraps child components with Suspense boundaries
 * to provide a seamless loading experience and better user feedback during content loading.
 */

import React, { Suspense } from "react";
import LoadingComponent from "../(auth)/_components/loading";

/**
 * Async layout component that provides Suspense boundaries for its children
 * Features:
 * - Implements React Suspense for loading state management
 * - Uses a dedicated LoadingComponent as fallback
 * - Supports async rendering patterns
 * - Handles loading states for nested components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the Suspense boundary
 * @returns {Promise<JSX.Element>} The layout wrapper with Suspense functionality
 */
async function layout({ children }: { children: React.ReactNode }) {
  return (
    /* Suspense wrapper for handling loading states
       - Provides a loading fallback component
       - Manages asynchronous content loading
       - Ensures smooth transition between loading and loaded states */
    <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
  );
}

export default layout;