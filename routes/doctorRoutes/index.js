import express from "express";
import Doctor from "../../db/model/doctorSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  try {
    const doctor = await Doctor.findOne({ userName: body.userName });
    if (doctor) {
      return res.status(403).json({ message: "Username already taken!" });
    }
    if (body.password !== body.confirmPassword) {
      return res.status(403).json({ message: "Passwards do not matching!" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);

    body.password = hashedPassword;
    await Doctor.create(body);

    return res.status(201).json({ message: "Signup successfull" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login successfull" });
});

export default router;
