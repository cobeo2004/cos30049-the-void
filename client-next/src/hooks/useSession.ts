"use client";

import { getSession } from "@/server/auth/getSession";
import { LoginResult } from "@/types";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<LoginResult | null>(null);
  useEffect(() => {
    function fetchSession() {
      const session = getSession();
      session
        .then((session) => {
          setSession(session);
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
        });
    }
    fetchSession();
  }, []);
  return session;
}
