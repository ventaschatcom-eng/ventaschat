import { redirect } from "next/navigation";

import { consumeVerificationToken, markEmailVerified } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return redirect("/login?verified=invalid");
  }

  const userId = await consumeVerificationToken(token);

  if (!userId) {
    return redirect("/login?verified=expired");
  }

  await markEmailVerified(userId);

  return redirect("/dashboard?verified=1");
}
