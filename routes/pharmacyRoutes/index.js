import express from "express";
import Pharmacy from "../../db/model/pharmacySchema.js";
import checkToken from "../../middlewares/checkToken.js";

const router = express.Router();

//list medicines

router.get("/", checkToken(["DOCTOR"]), async (req, res) => {
  try {
    const medicines = await Pharmacy.find();
    res.status(200).json(medicines);
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
  }
});

//add medicine
router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  try {
    const body = { ...req.body };
    const medicines = await Pharmacy.create(body);
    res.status(200).json({ message: "Medicine added successfully" });
  } catch (e) {
    res.status(502).json({ message: e.message });
  }
});

//list by id

router.get("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  try {
    const { id } = req.params;
    const medicines = await Pharmacy.findById(id);
    res.status(200).json(medicines);
  } catch (e) {
    console.log(e);
  }
});

//delete by id

router.get("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  try {
    const { id } = req.params;
    const medicines = await Pharmacy.findByIdAndDelete(id);
    res.status(201).json({ message: "Medicine deleted successfully" });
  } catch (e) {
    console.log(e);
  }
});

//update by id

router.patch("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  try {
    const medicine = Pharmacy.findByIdAndUpdate(id, body);
    res.status(201).json({ message: "Medicine updated successfully" });
  } catch (e) {
    console.log(e);
  }
});

export default router;
