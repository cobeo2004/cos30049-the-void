import { NextResponse } from "next/server";
import { NextFetchEvent } from "next/server";
import { NextRequest } from "next/server";
import { CustomMiddleware } from "./chained";

export default function withHeaderMiddleware(
  middleware: CustomMiddleware
): CustomMiddleware {
  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return middleware(request, event, response);
  };
}
