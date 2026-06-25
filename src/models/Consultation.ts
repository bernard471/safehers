import mongoose, { Schema, models } from "mongoose";

const ConsultationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: [
        "personal-safety",
        "online-safety",
        "financial-safety",
        "sextortion-response",
        "campus-safety",
        "general",
      ],
      required: true,
    },
    format: { type: String, enum: ["virtual", "in-person"], default: "virtual" },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String },
    description: { type: String, required: true, maxlength: 1000 },
    urgency: { type: String, enum: ["standard", "urgent"], default: "standard" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    consultantNotes: { type: String },
    location: { type: String },
    meetingLink: { type: String },
    confirmedDate: { type: Date },
  },
  { timestamps: true }
);

export const Consultation =
  models.Consultation || mongoose.model("Consultation", ConsultationSchema);
