import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { createSessionCookie, createUser, revokeAllSessions } from "@/services/auth/auth.service";

export async function POST(request: NextRequest,
  { params: {action} }: { params: { action: string }}) {
  if(action !== 'sign-in' && action !== 'create-user') {
    NextResponse.json({ success: false, data: "Method not allowed" });
  }

  if (action === 'sign-in') {
    const reqBody = (await request.json()) as { idToken: string };
    const idToken = reqBody.idToken;
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await createSessionCookie(idToken, { expiresIn });
    cookies().set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
  }

  if (action === 'create-user') {
    const user = await createUser(await request.json());
  }
  

  return NextResponse.json({ success: true, data: "Signed in successfully." });
}

export async function GET(request: NextRequest,
  { params: {action} }: { params: { action: string }}) {
  if(action !== 'sign-out') {
    NextResponse.json({ success: false, data: "Method not allowed" });
  }
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie)
    return NextResponse.json({ success: false, error: "Session not found." }, { status: 400 });

  cookies().delete("__session");

  await revokeAllSessions(sessionCookie);

  return NextResponse.json({ success: true, data: "Signed out successfully." });
}