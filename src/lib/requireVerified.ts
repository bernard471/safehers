import { NextResponse } from "next/server";
import { connectDB } from "./mongodb";
import { User } from "@/models/User";
import { requireAuth, type AuthResult } from "./rbac";

export async function requireVerifiedEmail(): Promise<AuthResult & { verified: boolean }> {
  const auth = await requireAuth();
  if (!auth.authorized) {
    return { ...auth, verified: false };
  }

  await connectDB();
  const user = await User.findById(auth.session!.user.id).select("emailVerified");
  const verified = user?.emailVerified === true;

  if (!verified) {
    return {
      authorized: true,
      session: auth.session,
      verified: false,
      response: NextResponse.json(
        { error: "Email verification required for this action." },
        { status: 403 }
      ),
    };
  }

  return { ...auth, verified: true };
}
