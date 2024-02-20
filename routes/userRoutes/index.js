import express from "express";
import User from "../../db/model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  try {
    const user = await User.findOne({ userName: body.userName });
    if (user) {
      return res.status(403).json({ message: "Username already taken!" });
    }
    if (body.password !== body.confirmPassword) {
      return res.status(403).json({ message: "Passwards do not matching!" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);

    body.password = hashedPassword;
    await User.create(body);

    return res.status(201).json({ message: "Signup successfull" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ userName: body.userName });
  if (!user) {
    return res.status(404).json({ message: "User name or Password incorrect" });
  }

  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(404).json({ message: "User name or Password incorrect" });
  }

  const token = jwt.sign(
    { role: "USER", id: user._id },
    process.env.USER_SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
  return res.status(200).json({ message: "Login Successfull", token: token });
});

export default router;
