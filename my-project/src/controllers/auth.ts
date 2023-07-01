import { RequestHandler } from "express";
import { User } from "../models/user";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "123456789"); // secret-key

    res.json({ user, token });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to register user", message: error.message });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "123456789"); // secret-key

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};
