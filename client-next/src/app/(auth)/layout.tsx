/**
 * @file layout.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Provides a layout component that wraps its children with a Suspense fallback for handling asynchronous loading states.
*/

import React, { Suspense } from "react";
import LoadingComponent from "./_components/loading";
/** 
* @description A layout component that wraps its children with a Suspense fallback for handling asynchronous loading states.
* @param children - The React nodes to be rendered within the AuthLayout.
* @returns A Suspense component that displays a LoadingComponent while the child components are being loaded.
*/
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}

export default AuthLayout;
