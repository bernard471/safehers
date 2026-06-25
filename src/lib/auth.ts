import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Try database lookup first (preferred — gives real user ID)
        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
            isActive: true,
            role: { $in: ["admin", "super_admin"] },
          });
          if (user) {
            const valid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (valid) {
              await User.updateOne({ _id: user._id }, { lastLoginAt: new Date() });
              return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role,
              };
            }
          }
        } catch (err) {
          console.error("[admin-login] DB check failed, trying env fallback:", err);
        }

        // 2. Fallback: env var hardcoded credentials (emergency access)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (
          adminEmail &&
          adminPassword &&
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return { id: "admin-env", email: adminEmail, name: "SafeHer Admin", role: "super_admin" };
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "portal-login",
      name: "Portal Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email.toLowerCase(), isActive: true });
          if (!user) return null;
          const valid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!valid) return null;

          // Block admin/super_admin from portal login — they must use /admin/login
          if (user.role === "admin" || user.role === "super_admin") return null;
          await User.updateOne({ _id: user._id }, { lastLoginAt: new Date() });
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "beneficiary";
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.userId as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
