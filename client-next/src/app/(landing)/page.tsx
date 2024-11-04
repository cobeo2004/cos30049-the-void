/**
 * @file page.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Main home page component that serves as the application's landing page.
 * It implements a responsive layout with a sticky navigation bar and a full-screen
 * dashboard view. The component is server-side rendered (async) to support server
 * components like the Navbar.
 */

import { DashboardHome } from "./_components/DashboardHome";
import { Navbar } from "./_components/Navbar";

/**
 * Root page component for the application's home route
 * Implements a two-section layout:
 * 1. A sticky navigation bar at the top
 * 2. A full-screen dashboard section
 * 
 * Uses server-side rendering (async component) to support server components
 * and provide better initial page load performance
 * 
 * @returns {Promise<JSX.Element>} The rendered home page with navigation and dashboard
 */
export default async function Home() {
  return (
    <>
      {/* Sticky navigation container 
          - Positioned at the top of the viewport
          - z-index ensures it stays above other content
          - Remains fixed while scrolling */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content container
          - Full viewport width and height
          - Contains the dashboard component with all main content */}
      <div className="h-screen w-screen">
        <DashboardHome />
      </div>
    </>
  );
}