import mongoose from "mongoose";
import { serviceSchema } from "./service";

export const appointmentSchema = new mongoose.Schema(
  {
    patientCPF: {
      type: String,
      required: true,
    },
    dentistLicense: {
      type: String,
      required: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["SCHEDULED", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default mongoose.model("Appointment", appointmentSchema);
