import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { requireRole } from "@/lib/rbac";
import { logAudit } from "@/lib/audit";

const TEST_USERS = [
  { name: "Ama Mensah", email: "beneficiary@test.safehers.africa", role: "beneficiary", country: "Ghana" },
  { name: "Kofi Mensah Jr", email: "minor@test.safehers.africa", role: "beneficiary", country: "Ghana", isMinor: true, guardianName: "Kofi Mensah Sr", guardianEmail: "guardian@test.safehers.africa", guardianConsent: true, dateOfBirth: new Date("2010-03-15") },
  { name: "Dr. Abena Osei", email: "educator@test.safehers.africa", role: "educator", country: "Ghana" },
  { name: "Kwame Asante", email: "consultant@test.safehers.africa", role: "consultant", country: "Ghana" },
  { name: "Prof. Esi Quaye", email: "institution@test.safehers.africa", role: "institution_admin", country: "Ghana" },
  { name: "Jennifer Kiplangat", email: "donor@test.safehers.africa", role: "donor", country: "Kenya" },
  { name: "David Admin", email: "admin@test.safehers.africa", role: "admin", country: "Ghana" },
  { name: "Super Admin", email: "super@test.safehers.africa", role: "super_admin", country: "Ghana" },
];

export async function POST() {
  try {
    const isDev = process.env.NODE_ENV !== "production";
    const allowSeed = process.env.SAFEHER_ALLOW_SEED === "true";
    const bypassAuth = isDev || allowSeed;

    let auth: any = { authorized: true };
    if (!bypassAuth) {
      auth = await requireRole("admin", "super_admin");
      if (!auth.authorized) return auth.response!;
    }

    if (process.env.NODE_ENV === "production" && !allowSeed) {
      return NextResponse.json({ error: "Seeding is disabled in production." }, { status: 403 });
    }

    await connectDB();
    const passwordHash = await bcrypt.hash("SafeHer2025!", 12);

    let created = 0;
    for (const userData of TEST_USERS) {
      const existing = await User.findOne({ email: userData.email });
      if (!existing) {
        await User.create({ ...userData, passwordHash, emailVerified: true });
        created++;
      }
    }

    // Seed the admin from .env.local credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
      if (!existingAdmin) {
        const adminHash = await bcrypt.hash(adminPassword, 12);
        await User.create({
          name: "SafeHer Admin",
          email: adminEmail.toLowerCase(),
          passwordHash: adminHash,
          role: "super_admin",
          country: "Ghana",
          emailVerified: true,
        });
        created++;
      }
    }

    await logAudit({
      userId: auth.session?.user?.id || "system",
      userEmail: auth.session?.user?.email || "system@safehers.africa",
      action: "seed_test_users",
      resource: "User",
      details: `Seeded ${created} of ${TEST_USERS.length} test users`,
    });

    return NextResponse.json({ ok: true, created, total: TEST_USERS.length });
  } catch (err) {
    console.error("[admin/seed-users]", err);
    return NextResponse.json({ error: "Seeding failed." }, { status: 500 });
  }
}
