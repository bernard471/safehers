import mongoose, { Schema, models } from "mongoose";

const SponsorSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["individual", "corporate", "foundation", "government"], required: true },
    contactName: { type: String },
    contactEmail: { type: String },
    totalContribution: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    isActive: { type: Boolean, default: true },
    logoUrl: { type: String },
    website: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Sponsor = models.Sponsor || mongoose.model("Sponsor", SponsorSchema);
