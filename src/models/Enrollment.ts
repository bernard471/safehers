import mongoose, { Schema, models } from "mongoose";

const LessonProgressSchema = new Schema({
  lessonId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  quizScore: { type: Number },
  quizPassed: { type: Boolean },
});

const EnrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    status: {
      type: String,
      enum: ["active", "completed", "dropped", "suspended"],
      default: "active",
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    lessonsCompleted: [LessonProgressSchema],
    currentModuleIndex: { type: Number, default: 0 },
    currentLessonIndex: { type: Number, default: 0 },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    certificate: { type: Schema.Types.ObjectId, ref: "Certificate" },
    scholarship: { type: Schema.Types.ObjectId, ref: "Scholarship" },
  },
  { timestamps: true }
);

EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const Enrollment = models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
