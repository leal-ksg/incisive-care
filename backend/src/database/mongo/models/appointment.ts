import mongoose from 'mongoose';

export const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    dentist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dentist',
      required: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED',
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.String,
        required: true,
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

export default mongoose.model('Appointment', appointmentSchema);
