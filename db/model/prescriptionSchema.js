import { model, Schema } from "mongoose";

const prescriptionSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
  message: {
    type: String,
  },
  medication: [{ type: Schema.Types.ObjectId, ref: "Pharmacy" }],
});
