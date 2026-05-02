# Payment Integration Plan — SafeHers

This document outlines the planned payment integration strategy for SafeHers certification
and programme purchases. No live payment code has been implemented yet; this document
is for planning and engineering reference.

---

## Providers

### 1. Paystack (Primary — Africa)

**Coverage:** Ghana, Nigeria, South Africa, Kenya, Rwanda, Ivory Coast, Egypt, Ethiopia, Tanzania, Uganda, Zambia

**Use cases:**
- Educator Certification purchases (one-time)
- Institutional Licence first payment (followed by invoice for renewal)
- Donation / scholarship fund contributions

**Integration approach:**
- Use [Paystack Popup JS](https://paystack.com/docs/payments/accept-payments/) for client-side payment initiation
- Create a `POST /api/pay/paystack` route that:
  1. Initialises a transaction via `https://api.paystack.co/transaction/initialize`
  2. Returns `authorization_url` and `reference` to the client
  3. Client redirects to Paystack hosted page OR uses the popup SDK
- Create a `GET /api/pay/paystack/verify?reference=` route to verify payment on callback
- Store successful payments in a `Purchase` MongoDB model (see below)

**Environment variables:**
```
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxxxxxx
```

---

### 2. Flutterwave (Secondary — broader African coverage)

**Coverage:** 30+ African countries including West, East, and Central Africa; also supports diaspora payments via international cards

**Use cases:**
- Diaspora customers (USD card payments)
- Countries not covered by Paystack
- Mobile money aggregation (Ghana MoMo, M-Pesa, Airtel Money)

**Integration approach:**
- Use [Flutterwave Standard](https://developer.flutterwave.com/docs/collecting-payments/standard) (hosted checkout redirect)
- Create a `POST /api/pay/flutterwave` initialisation route
- Create a `POST /api/pay/flutterwave/webhook` route to receive payment webhooks (verify with `FLW-SIGNATURE` header)

**Environment variables:**
```
FLW_SECRET_KEY=FLWSECK_xxxxxxxxxxxxxxxxxxxx
FLW_PUBLIC_KEY=FLWPUBK_xxxxxxxxxxxxxxxxxxxx
FLW_ENCRYPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxx
FLW_WEBHOOK_SECRET=your-webhook-secret
```

---

### 3. Stripe (Diaspora — US/EU)

**Use cases:**
- US and European institutional clients
- USD bank card payments from diaspora

**Note:** Stripe does not support most African bank cards directly. It is included as
a fallback for Western-based institutional buyers.

---

## Purchase Model (MongoDB)

```typescript
// src/models/Purchase.ts (to be created)
import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    email:      { type: String, required: true },
    name:       { type: String },
    product:    { type: String, required: true }, // "educator-cert" | "institutional" | "master-trainer"
    amount:     { type: Number, required: true },  // in smallest currency unit
    currency:   { type: String, default: "GHS" },
    provider:   { type: String, enum: ["paystack", "flutterwave", "stripe"] },
    reference:  { type: String, unique: true },
    status:     { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    metadata:   { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Purchase =
  mongoose.models.Purchase ?? mongoose.model("Purchase", PurchaseSchema);
```

---

## Pricing (at implementation time)

| Product | Price | Currency |
|---|---|---|
| Educator Certification (self-study) | 250 | USD |
| Educator Certification (cohort) | 350 | USD |
| Educator Certification (intensive) | 450 | USD |
| Master Trainer Certification | 1,500–3,000 | USD |
| Institutional Licence (small org) | 5,000 | USD/year |
| Institutional Licence (large org) | 25,000 | USD/year |

Local currency equivalents (GHS, NGN, KES) should be calculated at checkout time
using the provider's FX rate to avoid stale hardcoded conversions.

---

## Compliance Notes

- All payments must include a clear receipt email (use Resend — see `src/lib/email-templates.ts`)
- Ghana VAT (15%) may apply to B2B invoices — confirm with accountant
- Paystack handles PCI DSS compliance for card data; we never store raw card numbers
- Include a clear refund policy in Terms of Service (`src/app/terms/page.tsx`)

---

## Next Steps

1. Register SafeHers on [Paystack Dashboard](https://dashboard.paystack.com)
2. Complete business verification (CAC/registrar certificate, bank statement)
3. Create `src/models/Purchase.ts`
4. Create `src/app/api/pay/paystack/route.ts` (initialise + verify)
5. Add payment UI to `/pricing` page — "Buy Now" button triggers Paystack popup
6. Test with Paystack test keys before going live
