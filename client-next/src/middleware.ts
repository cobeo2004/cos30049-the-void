/**
 * @file middleware.ts
 * @author
 *   Xuan Tuan Minh Nguyen,
 *   Trong Dat Hoang,
 *   Henry Nguyen
 * @description Configures and exports middleware functions for the application,
 * including authentication and header manipulation, and specifies route matching
 * patterns for which the middleware should be applied.
 */

import chained, { MiddlewareFactory } from "./middlewares/chained"; // Import the 'chained' function to combine middleware and the 'MiddlewareFactory' type
import withAuthMiddleware from "./middlewares/withAuth"; // Import the authentication middleware function
import withHeaderMiddleware from "./middlewares/withHeader"; // Import the header manipulation middleware function

// Define an array of middleware functions, ensuring they conform to the 'MiddlewareFactory' type
const middlewares = [
  withAuthMiddleware,   // Middleware function to handle user authentication
  withHeaderMiddleware, // Middleware function to manipulate or add HTTP headers
] satisfies Array<MiddlewareFactory>;

// Chain the middleware functions together and export the combined middleware as the default export
export default chained(middlewares);

// Export the configuration object that specifies which routes the middleware should apply to
export const config = {
  matcher: [
    // Match all routes except for API routes and static files, to apply middleware only to these routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
