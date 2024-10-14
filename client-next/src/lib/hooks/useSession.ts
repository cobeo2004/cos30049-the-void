"use client";

import { getSession } from "@/server/auth/getSession";
import { LoginResult } from "@/types";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<LoginResult | null>(null);
  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      console.log("Session fetched:", session);
      setSession(session);
    }
    fetchSession();
  }, []);
  return session;
}
