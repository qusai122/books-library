import { Router } from "express";
import { getUserBooks } from "../controllers/books";
import { User } from "../models/user";
import passport from "../utils/passport";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/register", async (req, res) => {
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
      .status(422)
      .json({ error: "Failed to register user", message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email address" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //todo:: change secret key
    const token = jwt.sign({ id: user.id }, "123456789", { expiresIn: "1d" });
    user.password = "********";
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
});

router.get(
  "/books",
  passport.authenticate("jwt", { session: false }),
  getUserBooks
);

export const decodeToken = async (token: string, secret: string) => {
  const decoded = await jwt.verify(token, secret);
  return decoded;
};

export default router;
