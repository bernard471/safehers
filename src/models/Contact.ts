import mongoose, { Schema, models } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    organization: { type: String, trim: true },
    interest: {
      type: String,
      enum: [
        "certification",
        "institutional",
        "partnership",
        "speaking",
        "media",
        "other",
      ],
      default: "other",
    },
    message: { type: String, required: true },
    country: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Contact = models.Contact || mongoose.model("Contact", ContactSchema);
