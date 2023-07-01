import { Router } from "express";
import { getUserBooks } from "../controllers/rent";

const router = Router();
//router.post("/", RentBook);
//router.post("/", getBook);
router.get("/:id", getUserBooks);
export default router;
