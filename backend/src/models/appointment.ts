import mongoose from "mongoose";
import Service from "./service";

const appointmentSchema = new mongoose.Schema({
  patientCPF: {
    type: String,
    required: true,
  },
  dentistLicense: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["SCHEDULED", "COMPLETED", "CANCELLED"],
    default: "SCHEDULED",
    required: true,
  },
  services: [Service],
});

export default mongoose.model("Appointment", appointmentSchema);
