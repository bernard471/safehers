import { NextRequest, NextResponse } from "next/server";
import { Resend } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { checkRateLimit } from "@/lib/rateLimiter";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL ?? "hello@safehers.africa";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, country, city, chapterType, institution, experience, motivation } = body;

    if (!name || !email || !country || !city) {
      return NextResponse.json({ error: "Name, email, country, and city are required." }, { status: 400 });
    }

    await connectDB();
    await Contact.create({
      name,
      email: email.toLowerCase(),
      organization: institution || "",
      interest: "chapter",
      country,
      message: `CHAPTER APPLICATION\nType: ${chapterType || "campus"}\nCity: ${city}\nPhone: ${phone || "—"}\nInstitution: ${institution || "—"}\nExperience: ${experience || "—"}\nMotivation: ${motivation || "—"}`,
    });

    if (resend) {
      resend.emails.send({
        from: "SafeHer Foundation <noreply@safehers.africa>",
        to: NOTIFICATION_EMAIL,
        subject: `New chapter application: ${name} — ${country}`,
        html: `<p><strong>${name}</strong> (${email}) wants to ${chapterType === "join" ? "join" : "start"} a chapter in <strong>${city}, ${country}</strong>.</p><p>Type: ${chapterType}<br/>Institution: ${institution || "—"}<br/>Phone: ${phone || "—"}</p>${motivation ? `<p>Motivation: ${motivation}</p>` : ""}`,
      }).catch((e: unknown) => console.error("[chapters/join] Email failed:", e));
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[chapters/join]", err);
    return NextResponse.json({ error: "Application failed." }, { status: 500 });
  }
}
