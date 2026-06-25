import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Donation } from "@/models/Donation";
import { checkRateLimit } from "@/lib/rateLimiter";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://safehers.africa";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    if (!PAYSTACK_SECRET) {
      return NextResponse.json({ error: "Payment system not configured." }, { status: 503 });
    }

    const body = await req.json();
    const { name, email, amount, currency, category, type, dedication, isAnonymous, organization, country, message } = body;

    if (!name || !email || !amount || amount < 1) {
      return NextResponse.json({ error: "Name, email, and valid amount required." }, { status: 400 });
    }

    await connectDB();

    const donation = await Donation.create({
      name, email: email.toLowerCase(),
      amount, currency: currency || "GHS",
      type: type || "one-time",
      category: category || "general",
      dedication, isAnonymous, organization, country, message,
      status: "pending",
    });

    // Paystack expects amount in smallest currency unit (pesewas for GHS, kobo for NGN)
    const amountInSmallestUnit = Math.round(amount * 100);

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        amount: amountInSmallestUnit,
        currency: currency || "GHS",
        callback_url: `${BASE_URL}/donate/success?donationId=${donation._id}`,
        metadata: {
          donationId: donation._id.toString(),
          donorName: name,
          category,
          custom_fields: [
            { display_name: "Donor", variable_name: "donor", value: name },
            { display_name: "Category", variable_name: "category", value: category || "general" },
          ],
        },
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      console.error("[paystack/initialize] Paystack API error details:", paystackData);
      return NextResponse.json({ error: paystackData.message || "Payment initialization failed." }, { status: 500 });
    }

    await Donation.updateOne({ _id: donation._id }, { paymentReference: paystackData.data.reference });

    return NextResponse.json({
      ok: true,
      authorizationUrl: paystackData.data.authorization_url,
      reference: paystackData.data.reference,
      donationId: donation._id,
    });
  } catch (err) {
    console.error("[paystack/initialize]", err);
    return NextResponse.json({ error: "Payment failed." }, { status: 500 });
  }
}
