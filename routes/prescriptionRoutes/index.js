import express from "express";
import checkToken from "../../middlewares/checkToken";
import Prescription from "../../db/model/prescriptionSchema.js";
import Pharmacy from "../../db/model/pharmacySchema.js";

const router = express.Router();

//Add prescription by doctor

router.post("/doctor", checkToken(["DOCTOR"]), async (req, res) => {
  const body = { ...req.body };
  const prescription = await Prescription.create(body);
  res.status(201).json({ message: "Prescription added" });
});

//List prescription by appintment id

router.get(
  "/appointment/:id",
  checkToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { id } = req.params;
    const prescription = await Prescription.find({ appointment: id });
    res.status(200).json(prescription);
  }
);

//list medicine using prescription by appointment id

router.get(
  "/pharmacy/appointments/:appointment_id",
  checkToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { appointment_id } = req.params;
    const prescription = await Prescription.findOne({
      appointment: appointment_id,
    });
    const medicines = await Pharmacy.find({
      _id: { $in: prescription.medication },
    });

    res.status(200).json(medicines);
  }
);

export default router;
