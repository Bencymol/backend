import express from "express";
import Doctor from "../../db/model/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const doctor = await Doctor.findOne({ userName: body.userName });
  if (!doctor) {
    return res.status(404).json({ message: "User name or Password incorrect" });
  }
  const isMatching = bcrypt.compare(body.password, doctor.password);
  if (!isMatching) {
    return res.status(404).json({ message: "User name or Password incorrect" });
  }
  const secretKey =
    "hcbshcbdjhsdhfjsnmnkncdjvsuhfiwu8ruirfrheuri33uehfjsncmxcbnxcnber646fgre45rgrh433eytyt56gh";

  const token = jwt.sign({ role: "DOCTOR", id: doctor._id }, secretKey, {
    expiresIn: "2h",
  });

  res.status(200).json({ message: "Login successfull", token: token });
});

export default router;
