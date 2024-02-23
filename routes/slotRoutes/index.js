import express from "express";
import Slot from "../../db/model/slotSchema.js";
import checkToken from "../../middlewares/checkToken.js";

const router = express.Router();

//adding slots by doctor --- doctor route

router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  const body = [...req.body];

  await Slot.insertMany(body);
  res.status(201).json({ message: "Slots added" });
});

//slots listing by user --user route

router.post("/doctor/:id", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const { id } = req.params;
  const slots = await Slot.find({ doctor: id });
  res.status(200).json(slots);
});

export default router;
