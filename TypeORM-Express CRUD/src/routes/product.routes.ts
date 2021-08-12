import { Router } from "express";
const router = Router();

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";


router.get("/produtcs", getProducts);
router.get("/produtc/:id", getProductById);
router.post("/produtc", createProduct);
router.put("/produtc/:id", updateProduct);
router.delete("/produtc/:id", deleteProduct);

export default router;
