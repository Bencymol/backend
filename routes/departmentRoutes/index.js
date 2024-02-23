import express from "express";
import Department from "../../db/model/departmentSchema.js";
import checkToken from "../../middlewares/checkToken.js";
import Doctor from "../../db/model/doctorSchema.js";

const router = express.Router();

//add department

router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  const body = { ...req.body };
  try {
    await Department.create(body);
    res.status(201).json({ message: "Department added successfully" });
  } catch (e) {
    console.log(e);
  }
});

//List all department

router.get("/", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const id = req.params.id;
  try {
    const departments = await Department.findById(id);
    res.status(200).json(departments);
  } catch (e) {
    console.log(e);
  }
});

//delete department

router.delete("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const id = req.params.id;
  try {
    await Department.findByIdAndDelete(id);
    res.status(201).json({ message: "Department deleted successfully" });
  } catch (e) {
    console.log(e);
  }
});

//update department

router.patch("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const id = req.params.id;
  const body = { ...req.body };
  try {
    await Department.findByIdAndUpdate(id, body);
    res.status(201).json({ message: "Department updated successfully" });
  } catch (e) {
    console.log(e);
  }
});

//list doctors by department

router.get("/doctor/:dep_id", checkToken(["USER"]), async (req, res) => {
  const { dep_id } = req.params;
  const doctor = Doctor.find({ department: dep_id });
  res.status(200).json(doctor);
});

export default router;
