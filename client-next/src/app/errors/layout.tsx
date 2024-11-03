/**
 * @file layout.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Root layout component that serves as the main layout wrapper for the application.
 * It provides a consistent layout structure with a sticky header area and a main content area
 * that spans the full viewport. This layout is used across all pages to maintain consistent
 * spacing and structure.
 */

/**
 * Root layout component that wraps all pages in the application
 * Implements a two-section layout:
 * 1. A sticky container for header content
 * 2. A full-viewport content area for page content
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered in the layout
 * @returns {JSX.Element} The layout wrapper with header and content areas
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Sticky header container
          - Positioned at the top of the viewport
          - High z-index ensures it stays above other content
          - Empty by default, can be used for global header content */}
      <div className="sticky top-0 z-50"></div>

      {/* Main content container
          - Full viewport width and height
          - Contains the page-specific content passed as children
          - Ensures consistent page dimensions across the application */}
      <div className="h-screen w-screen">{children}</div>
    </>
  );
}