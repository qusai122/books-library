import { Router } from "express";
const passport = require("passport");

import {
  createBook,
  deleteBook,
  getBooks,
  getOneBook,
  updateBook,
  rentBook,
  returnBook,
} from "../controllers/books";
const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), createBook);

router.get("/all", passport.authenticate("jwt", { session: false }), getBooks);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getOneBook
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateBook
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBook
);

router.post(
  "/rent/:id",
  passport.authenticate("jwt", { session: false }),
  rentBook
);

router.post(
  "/return/:id",
  passport.authenticate("jwt", { session: false }),
  returnBook
);

export default router;
