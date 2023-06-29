import { Router } from "express";
const passport = require("passport");

import {
  createUser,
  deleteUser,
  getOneUser,
  getUser,
  updateUser,
} from "../controllers/user";
const router = Router();
router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
