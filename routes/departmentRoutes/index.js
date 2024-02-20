import express from "express";
import Department from "../../db/model/departmentSchema.js";
import checkToken from "../../middlewares/checkToken.js";

const router = express.Router();

router.post("/", checkToken, async (req, res) => {
  const body = { ...req.body };
  try {
    await Department.create(body);
    res.status(201).json({ message: "Department added successfully" });
  } catch (e) {
    console.log(e);
  }
});

router.get("/", checkToken, async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const departments = await Department.findById(id);
    res.status(200).json(departments);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Department.findByIdAndDelete(id);
    res.status(201).json({ message: "Department deleted successfully" });
  } catch (e) {
    console.log(e);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const body = { ...req.body };
  try {
    await Department.findByIdAndUpdate(id, body);
    res.status(201).json({ message: "Department updated successfully" });
  } catch (e) {
    console.log(e);
  }
});

export default router;
