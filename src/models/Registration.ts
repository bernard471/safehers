import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IRegistration extends Document {
  name: string;
  email: string;
  country: string;
  format: "in-person-accra" | "virtual" | "either";
  learningGoals?: string;
  phone?: string;
  consentToContact: boolean;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: { unique: true },
  },
  country: { type: String, trim: true, default: "Ghana" },
  format: {
    type: String,
    enum: ["in-person-accra", "virtual", "either"],
    default: "either",
  },
  learningGoals: { type: String, maxlength: 1000 },
  phone: { type: String, trim: true },
  consentToContact: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Registration =
  models.Registration || model<IRegistration>("Registration", RegistrationSchema);
