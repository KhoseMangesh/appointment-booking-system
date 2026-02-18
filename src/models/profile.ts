import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    fullName: { type: String, default: "" },
    age: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    pastMedicalCondition: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.Profile || model("Profile", ProfileSchema);
