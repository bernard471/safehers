import mongoose, { Schema, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    type: { type: String, enum: ["workshop", "webinar", "conference", "training", "community"], default: "workshop" },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String },
    isVirtual: { type: Boolean, default: false },
    meetingLink: { type: String },
    maxAttendees: { type: Number },
    registeredCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    coverImage: { type: String },
    organizer: { type: String, default: "SafeHer Foundation" },
  },
  { timestamps: true }
);

export const Event = models.Event || mongoose.model("Event", EventSchema);
