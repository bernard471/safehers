import mongoose, { Schema, models } from "mongoose";

const ResourceDownloadSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    resourceId: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    downloadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ResourceDownload =
  models.ResourceDownload ||
  mongoose.model("ResourceDownload", ResourceDownloadSchema);
