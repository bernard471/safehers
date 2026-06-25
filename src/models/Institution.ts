import mongoose, { Schema, models } from "mongoose";

const InstitutionSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["university", "corporate", "ngo", "government", "school", "other"], required: true },
    country: { type: String, default: "Ghana" },
    city: { type: String },
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    isActive: { type: Boolean, default: true },
    partnerSince: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Institution =
  models.Institution || mongoose.model("Institution", InstitutionSchema);
