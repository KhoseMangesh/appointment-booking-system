import { Schema, models, model } from "mongoose";

const AppointmentSchema = new Schema(
  {
    // ✅ Link appointment to logged-in user
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },

    doctorName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Prevent double booking
AppointmentSchema.index(
  { doctorName: 1, date: 1, time: 1 },
  { unique: true }
);

export default models.Appointment ||
  model("Appointment", AppointmentSchema);
