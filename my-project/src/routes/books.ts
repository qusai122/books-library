import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getOneBook,
  updateBook,
} from "../controllers/books";
const router = Router();
router.post("/", createBook);
router.get("/", getBook);
router.get("/:id", getOneBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
export default router;
