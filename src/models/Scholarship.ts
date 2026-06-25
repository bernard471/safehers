import mongoose, { Schema, models } from "mongoose";

const ScholarshipSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    sponsor: { type: Schema.Types.ObjectId, ref: "Sponsor" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    totalSeats: { type: Number, required: true },
    usedSeats: { type: Number, default: 0 },
    eligibilityCriteria: { type: String },
    isActive: { type: Boolean, default: true },
    applicationDeadline: { type: Date },
  },
  { timestamps: true }
);

export const Scholarship =
  models.Scholarship || mongoose.model("Scholarship", ScholarshipSchema);
