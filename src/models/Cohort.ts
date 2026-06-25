import mongoose, { Schema, models } from "mongoose";

const CohortSchema = new Schema(
  {
    name: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    institution: { type: Schema.Types.ObjectId, ref: "Institution" },
    sponsor: { type: Schema.Types.ObjectId, ref: "Sponsor" },
    startDate: { type: Date },
    endDate: { type: Date },
    maxParticipants: { type: Number, default: 30 },
    currentParticipants: { type: Number, default: 0 },
    status: { type: String, enum: ["planned", "active", "completed", "cancelled"], default: "planned" },
    location: { type: String },
    facilitator: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Cohort = models.Cohort || mongoose.model("Cohort", CohortSchema);
