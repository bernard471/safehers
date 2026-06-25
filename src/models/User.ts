import mongoose, { Schema, models } from "mongoose";

export const USER_ROLES = [
  "beneficiary",
  "educator",
  "consultant",
  "institution_admin",
  "donor",
  "admin",
  "super_admin",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: USER_ROLES, default: "beneficiary" },
    phone: { type: String, trim: true },
    country: { type: String, default: "Ghana" },
    dateOfBirth: { type: Date },
    isMinor: { type: Boolean, default: false },
    guardianName: { type: String, trim: true },
    guardianEmail: { type: String, trim: true },
    guardianConsent: { type: Boolean, default: false },
    institution: { type: Schema.Types.ObjectId, ref: "Institution" },
    cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
    bio: { type: String, maxlength: 500 },
    avatarUrl: { type: String },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
