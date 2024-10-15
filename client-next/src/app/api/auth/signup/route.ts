import { API_URL } from "@/lib/constant";
import { signupSchema } from "@/server/auth/schema";
import { setSession } from "@/server/session";
import { LoginResult } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data, error, success } = signupSchema.safeParse(await req.json());

    if (!data || !success) {
      return NextResponse.json(
        {
          message: "All fields are required." + error.message,
        },
        { status: 400 }
      );
    }
    const fetched = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!fetched.ok) {
      return NextResponse.json(
        {
          message: fetched.statusText,
        },
        { status: fetched.status }
      );
    }

    const result = (await fetched.json()) as LoginResult;
    setSession(result);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
