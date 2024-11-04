/**
 * @file layout.tsx
 * @author
 * Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Defines the RootLayout component that wraps child components with a Suspense fallback for loading states.
 */

import { type Metadata } from "next"; // Import the Metadata type from Next.js for page metadata
import LoadingComponent from "../(auth)/_components/loading"; // Import a loading component to show during suspense
import { Suspense } from "react"; // Import Suspense for handling asynchronous component loading

// Define metadata for the page, used by Next.js
export const metadata: Metadata = {
  title: "Home", // Set the page title
  description: "Home", // Set the page description
};

// Define and export the RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Define the type for children prop
}>) {
  // Return the Suspense component that wraps the children components
  return (
    <Suspense fallback={<LoadingComponent />}>
      {children} {/* Render child components with a fallback UI during loading */}
    </Suspense>
  );
}
