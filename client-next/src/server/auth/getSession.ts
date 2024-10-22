"use server";

import { validateSession } from "../session";

export const getSession = async () => {
  const session = await validateSession();
  return session;
};
