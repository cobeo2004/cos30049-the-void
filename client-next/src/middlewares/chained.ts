import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (
  middleware: CustomMiddleware
) => CustomMiddleware;

export default function chained(
  middlewares: Array<MiddlewareFactory>,
  index: number = 0
): CustomMiddleware {
  const curr = middlewares[index];

  if (curr) {
    const next = chained(middlewares, index + 1);
    return curr(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => response;
}
