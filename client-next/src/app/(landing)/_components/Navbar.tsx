/**
 * @file Navbar.tsx
 * @author Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
 * @description Server-side navbar component that handles session validation and renders 
 * the client-side navbar. This component acts as a wrapper to ensure proper session 
 * management before rendering the navigation interface.
 */

import { validateSession } from "@/server/session";
import { NavbarClient } from "./NavbarClient";

/**
 * Disable page caching to ensure session state is always current
 * This ensures that the navigation bar always reflects the user's latest session status
 */
export const revalidate = 0;

/**
 * Server component that handles session validation and renders the client-side navbar
 * Using an async component to validate the session server-side before passing it to the client
 * This approach provides better security and prevents unauthorized access to protected routes
 * 
 * @returns {Promise<JSX.Element>} The NavbarClient component with validated session data
 */
export const Navbar = async () => {
  // Validate user session server-side
  const session = await validateSession();

  // Render client-side navbar with validated session data
  return <NavbarClient session={session} />;
};