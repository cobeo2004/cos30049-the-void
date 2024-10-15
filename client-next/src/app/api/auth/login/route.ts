import { NextResponse } from "next/server";
import { loginSchema } from "@/server/auth/schema";
import { API_URL } from "@/lib/constant";
import { LoginResult } from "@/types";
import { setSession } from "@/server/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("body", body);
    const { data, success, error } = loginSchema.safeParse({
      username: body.username,
      password: body.password,
    });

    if (!success) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { username, password } = data as {
      username: string;
      password: string;
    };

    const result = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.statusText },
        { status: result.status }
      );
    }

    const loginData = (await result.json()) as LoginResult;
    setSession(loginData);
    return NextResponse.json(loginData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
