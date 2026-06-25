import mongoose, { Schema, models } from "mongoose";

const ChecklistItemSchema = new Schema({
  label: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  category: { type: String, enum: ["personal", "home", "online", "financial", "emergency"], required: true },
});

const SafetyPlanSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    emergencyContacts: [
      {
        name: { type: String },
        phone: { type: String },
        relationship: { type: String },
      },
    ],
    safeLocations: [{ type: String }],
    checklist: [ChecklistItemSchema],
    personalNotes: { type: String, maxlength: 2000 },
    lastReviewedAt: { type: Date },
  },
  { timestamps: true }
);

export const SafetyPlan =
  models.SafetyPlan || mongoose.model("SafetyPlan", SafetyPlanSchema);
