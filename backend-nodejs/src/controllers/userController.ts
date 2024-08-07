import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user";
import { Config } from "../config";

const router = express.Router();

export interface ITokenDecode {
  id: string;
}

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId } as ITokenDecode, Config.secret, {
    expiresIn: "1h",
  });
};

router.post("/register", async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });

    user.password = "";

    return res.send({ user });
  } catch (error) {
    return res.status(400).send({ error: "Registration Failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateToken(user._id.toString());
    res.json({
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

export default router;
