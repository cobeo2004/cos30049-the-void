import { auth } from "@/server/session";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  await auth();
  return <div>{children}</div>;
}

export default layout;
