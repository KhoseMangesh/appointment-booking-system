import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  doctor: String,
  date: String,
  time: String
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
