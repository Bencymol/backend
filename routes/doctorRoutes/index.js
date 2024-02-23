import express from "express";
import Doctor from "../../db/model/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import checkToken from "../../middlewares/checkToken.js";

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

  const token = jwt.sign(
    { role: "DOCTOR", id: doctor._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  res.status(200).json({ message: "Login successfull", token: token });
});

//get doc by id

router.get("/profile/:id", checkToken(["USER"]), async (req, res) => {
  const { id } = req.params;

  // const doctor = await Doctor.findById(id).populate("department");
  // doctor.password = "";

  const doctor = await Doctor.aggregate([
    {
      $match: {
        //instead of findbyid
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "departmentDetails",
      },
    },
    {
      $project: {
        name: 1,
        userName: 1,
        image: 1,
        specialization: 1,
        departmentDetails: 1,
      },
    },
  ]);

  res.status(200).json(doctor);
});

export default router;
