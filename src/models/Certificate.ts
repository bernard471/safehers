import mongoose, { Schema, models } from "mongoose";

const CertificateSchema = new Schema(
  {
    certificateId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: "Enrollment", required: true },
    userName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    grade: { type: String },
    isRevoked: { type: Boolean, default: false },
    revokedReason: { type: String },
  },
  { timestamps: true }
);

export const Certificate = models.Certificate || mongoose.model("Certificate", CertificateSchema);
