import mongoose, { Schema, models } from "mongoose";

const DonationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    type: {
      type: String,
      enum: ["one-time", "monthly", "quarterly", "annual"],
      default: "one-time",
    },
    category: {
      type: String,
      enum: [
        "general",
        "scholarship",
        "cohort-sponsorship",
        "curriculum-development",
        "academy-operations",
        "campus-chapter",
      ],
      default: "general",
    },
    dedication: { type: String, trim: true, maxlength: 200 },
    isAnonymous: { type: Boolean, default: false },
    organization: { type: String, trim: true },
    country: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 500 },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentReference: { type: String },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

export const Donation = models.Donation || mongoose.model("Donation", DonationSchema);
