import { getSession } from "@/server/auth/getSession";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chained";

export default function withAuthMiddleware(
  middleware: CustomMiddleware
): CustomMiddleware {
  return async (req: NextRequest, event: NextFetchEvent, res: NextResponse) => {
    if (req.nextUrl.pathname.startsWith("/signed-in")) {
      const session = await getSession();
      if (session === null) {
        return NextResponse.redirect(new URL("/errors/unauth", req.url));
      }
    }

    return middleware(req, event, res);
  };
}
