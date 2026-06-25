import mongoose, { Schema, models } from "mongoose";

const LessonSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  type: { type: String, enum: ["text", "video", "quiz", "activity"], default: "text" },
  content: { type: String },
  videoUrl: { type: String },
  durationMinutes: { type: Number, default: 10 },
  order: { type: Number, required: true },
  quizQuestions: [
    {
      question: { type: String, required: true },
      options: [{ type: String }],
      correctIndex: { type: Number, required: true },
      explanation: { type: String },
    },
  ],
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  lessons: [LessonSchema],
});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["personal-safety", "online-safety", "financial-safety", "campus-safety", "wellbeing"],
      default: "personal-safety",
    },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    durationHours: { type: Number, default: 4 },
    modules: [ModuleSchema],
    coverImage: { type: String },
    instructor: { type: String, default: "SafeHer Foundation" },
    isFree: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    enrollmentCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    prerequisites: [{ type: String }],
    learningOutcomes: [{ type: String }],
    certificateEnabled: { type: Boolean, default: true },
    passingScore: { type: Number, default: 70 },
  },
  { timestamps: true }
);

export const Course = models.Course || mongoose.model("Course", CourseSchema);
