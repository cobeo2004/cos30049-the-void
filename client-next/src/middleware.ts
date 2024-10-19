import chained, { MiddlewareFactory } from "./middlewares/chained";
import withAuthMiddleware from "./middlewares/withAuth";
import withHeaderMiddleware from "./middlewares/withHeader";
const middlewares = [
  withAuthMiddleware,
  withHeaderMiddleware,
] satisfies Array<MiddlewareFactory>;

export default chained(middlewares);

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
