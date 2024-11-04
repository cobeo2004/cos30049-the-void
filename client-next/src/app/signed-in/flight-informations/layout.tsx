/**
 * @file layout.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Root layout component for the application that provides a consistent
 * structure with a sticky navigation bar and a main content area. This layout is
 * used as a wrapper for all pages within its routing context to maintain consistent
 * navigation and layout patterns.
 */

import { Navbar } from "@/app/(landing)/_components/Navbar";

/**
 * Root layout component that provides the base structure for the application
 * Features:
 * - Sticky navigation bar at the top
 * - Full viewport content area
 * - Consistent z-index management
 * - Flexible children rendering
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The layout wrapper with navigation and content areas
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Sticky navigation container
          - Fixed position at top of viewport
          - High z-index to stay above other content
          - Prevents content from scrolling over navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content container
          - Full viewport dimensions
          - Renders children components
          - Allows for scrollable content while maintaining navbar position */}
      <div className="h-screen w-screen">{children}</div>
    </>
  );
}