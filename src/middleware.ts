import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/** Map each role to its home dashboard */
function getDashboardForRole(role?: string): string {
  switch (role) {
    case "admin":
    case "super_admin":
      return "/admin";
    case "institution_admin":
      return "/institution";
    case "donor":
      return "/donor";
    case "educator":
      return "/educator";
    case "consultant":
      return "/consultant";
    default:
      return "/portal";
  }
}

/** Paths within each dashboard group that don't require auth */
const PUBLIC_PATHS = new Set([
  "/admin/login",
  "/portal/login",
  "/portal/register",
  "/portal/forgot-password",
  "/portal/reset-password",
]);

/** Role requirements for each dashboard route prefix */
const ROUTE_ROLES: Record<string, string[]> = {
  "/admin": ["admin", "super_admin"],
  "/institution": ["institution_admin", "admin", "super_admin"],
  "/donor": ["donor", "admin", "super_admin"],
  "/educator": ["educator", "admin", "super_admin"],
  "/consultant": ["consultant", "admin", "super_admin"],
  "/portal": [], // any authenticated user
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths (login, register, etc.)
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Find which dashboard group this path belongs to
  const matchedPrefix = Object.keys(ROUTE_ROLES).find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!matchedPrefix) {
    return NextResponse.next();
  }

  const requiredRoles = ROUTE_ROLES[matchedPrefix];
  const userRole = token?.role as string | undefined;

  // Not authenticated → redirect to login
  if (!token) {
    const loginUrl = matchedPrefix === "/admin"
      ? new URL("/admin/login", request.url)
      : new URL("/portal/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated but wrong role → redirect to their correct dashboard
  if (requiredRoles.length > 0 && (!userRole || !requiredRoles.includes(userRole))) {
    const correctDashboard = getDashboardForRole(userRole);
    const redirectUrl = new URL(correctDashboard, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/institution/:path*",
    "/donor/:path*",
    "/educator/:path*",
    "/consultant/:path*",
  ],
};
