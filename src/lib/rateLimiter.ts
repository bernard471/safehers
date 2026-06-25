import mongoose, { Schema, models } from "mongoose";
import { connectDB } from "./mongodb";

const RateLimitSchema = new Schema({
  key: { type: String, required: true, index: true },
  count: { type: Number, default: 1 },
  resetAt: { type: Date, required: true, index: { expires: 0 } },
});

const RateLimitEntry =
  models.RateLimitEntry || mongoose.model("RateLimitEntry", RateLimitSchema);

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  default: { max: 5, windowMs: 60 * 60 * 1000 },
  auth: { max: 10, windowMs: 15 * 60 * 1000 },
  register: { max: 3, windowMs: 60 * 60 * 1000 },
  verify: { max: 20, windowMs: 60 * 60 * 1000 },
};

// In-memory fallback when DB is unavailable
const memStore = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(
  ip: string,
  bucket: string = "default"
): Promise<boolean> {
  const config = LIMITS[bucket] || LIMITS.default;
  const key = `${bucket}:${ip}`;
  const now = Date.now();

  try {
    await connectDB();
    const entry = await RateLimitEntry.findOne({ key });

    if (!entry || new Date(entry.resetAt).getTime() < now) {
      await RateLimitEntry.findOneAndUpdate(
        { key },
        { key, count: 1, resetAt: new Date(now + config.windowMs) },
        { upsert: true }
      );
      return true;
    }

    if (entry.count >= config.max) return false;

    await RateLimitEntry.updateOne({ key }, { $inc: { count: 1 } });
    return true;
  } catch {
    // Fallback to in-memory if DB fails
    const mem = memStore.get(key);
    if (!mem || now > mem.resetAt) {
      memStore.set(key, { count: 1, resetAt: now + config.windowMs });
      return true;
    }
    if (mem.count >= config.max) return false;
    mem.count++;
    return true;
  }
}
