import mongoose, { Schema, models } from "mongoose";

const NewsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Newsletter =
  models.Newsletter || mongoose.model("Newsletter", NewsletterSchema);
