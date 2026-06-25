import { connectDB } from "./mongodb";
import mongoose, { Schema, models } from "mongoose";

const AuditLogSchema = new Schema({
  userId: { type: String, required: true },
  userEmail: { type: String },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: String },
  details: { type: String },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const AuditLog = models.AuditLog || mongoose.model("AuditLog", AuditLogSchema);

export async function logAudit(params: {
  userId: string;
  userEmail?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ip?: string;
}) {
  try {
    await connectDB();
    await AuditLog.create(params);
  } catch (err) {
    console.error("[audit] Failed to log:", err);
  }
}

export { AuditLog };
