
import { Router } from "express";
const router = Router();

import { getCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller";

router.get("/category", getCategory);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
