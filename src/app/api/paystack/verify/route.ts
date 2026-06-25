import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Donation } from "@/models/Donation";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get("reference");
    if (!reference) {
      return NextResponse.json({ error: "Reference required." }, { status: 400 });
    }

    if (!PAYSTACK_SECRET) {
      return NextResponse.json({ error: "Payment system not configured." }, { status: 503 });
    }

    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    });

    const data = await paystackRes.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ verified: false, status: data.data?.status || "failed" });
    }

    await connectDB();

    const donationId = data.data.metadata?.donationId;
    if (donationId) {
      await Donation.updateOne(
        { _id: donationId },
        {
          status: "completed",
          paymentMethod: data.data.channel,
          paymentReference: reference,
        }
      );
    }

    return NextResponse.json({
      verified: true,
      status: "success",
      amount: data.data.amount / 100,
      currency: data.data.currency,
    });
  } catch (err) {
    console.error("[paystack/verify]", err);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
