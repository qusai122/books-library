import { Router } from "express";
const passport = require("passport");

import {
  createUser,
  deleteUser,
  getOneUser,
  getUser,
  updateUser,
} from "../controllers/user";
import { getUserBooks, rentBook } from "../controllers/rent";

const router = Router();
router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/books/:id", getUserBooks);
router.post("/rent/:id", rentBook);

export default router;
