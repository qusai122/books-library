import { Router } from "express";
const passport = require("passport");
//Warning: this file is not needed only for testing !! or for admin user in the future
import {
  createUser,
  deleteUser,
  getOneUser,
  getUser,
  updateUser,
} from "../controllers/user";
import { getUserBooks, rentBook } from "../controllers/books";

const router = Router();
router.post("/", passport.authenticate("jwt", { session: false }), createUser);
router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getOneUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

router.get(
  "/books/:id",
  passport.authenticate("jwt", { session: false }),
  getUserBooks
);
router.post("/rent/:id", rentBook);

export default router;
