import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";
import type { UserRole } from "@/models/User";

export interface AuthResult {
  authorized: boolean;
  session: { user: { id: string; email: string; name: string; role: UserRole } } | null;
  response?: NextResponse;
}

export async function requireRole(...roles: UserRole[]): Promise<AuthResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      authorized: false,
      session: null,
      response: NextResponse.json({ error: "Authentication required." }, { status: 401 }),
    };
  }

  const userRole = (session.user as { role?: string }).role as UserRole | undefined;
  if (!userRole || !roles.includes(userRole)) {
    return {
      authorized: false,
      session: null,
      response: NextResponse.json({ error: "Insufficient permissions." }, { status: 403 }),
    };
  }

  return {
    authorized: true,
    session: session as AuthResult["session"],
  };
}

export async function requireAuth(): Promise<AuthResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      authorized: false,
      session: null,
      response: NextResponse.json({ error: "Authentication required." }, { status: 401 }),
    };
  }
  return {
    authorized: true,
    session: session as AuthResult["session"],
  };
}

export function isAdmin(role: string | undefined): boolean {
  return role === "admin" || role === "super_admin";
}
