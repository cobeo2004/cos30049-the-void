import { auth } from "@/server/session";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

export const unauthAction = createSafeActionClient({
  handleServerError: (err) => {
    console.error("Error occured while processing action: ", err);
    if (err instanceof Error) {
      return err.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authAction = createSafeActionClient({
  handleServerError: (err) => {
    console.error("Error occured while processing action: ", err);
    if (err instanceof Error) {
      return err.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  const session = await auth();
  if (session === null) {
    throw new Error("Unauthorized");
  }
  return next({ ctx: session });
});
