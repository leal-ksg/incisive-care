import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  unitAmount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Service", serviceSchema);
