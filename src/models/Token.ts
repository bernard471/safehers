import mongoose, { Schema, models } from "mongoose";

const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["email_verification", "password_reset", "admin_otp"],
    required: true,
  },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Token = models.Token || mongoose.model("Token", TokenSchema);
