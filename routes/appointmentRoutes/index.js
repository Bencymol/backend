import express from "express";
import checkToken from "../../middlewares/checkToken.js";
import Appointment from "../../db/model/appointmentSchema.js";
import Slot from "../../db/model/slotSchema.js";

const router = express.Router();

//list appointments by doctor

router.get("/doctor/:doc_id", checkToken(["DOCTOR"]), async (req, res) => {
  const { doc_id } = req.params;
  const appointments = await Appointment.find({ doctor: doc_id });
  res.status(200).json(appointments);
});

//list appointments by user

router.get("/doctor/:user_id", checkToken(["USER"]), async (req, res) => {
  const { user_id } = req.params;
  const appointments = await Appointment.find({ user: user_id });
  res.status(200).json(appointments);
});

//take appointment

router.post("/", checkToken(["USER"]), async (req, res) => {
  const body = { ...req.body };
  const slotId = body.slot;
  const appointment = await Appointment.create(body);
  const slot = await Slot.findByIdAndUpdate(slotId, { availability: false });
  res.status(201).json({ message: "Appointment Booked" });
});

export default router;
