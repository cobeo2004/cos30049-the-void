// NOTE: This file is used to test the server side code
// It is not used in the production environment

"use server";

import { NextResponse } from "next/server";

export async function testServer(isError: boolean) {
  if (isError) {
    return NextResponse.json({ message: "Error" }, { status: 422 });
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
