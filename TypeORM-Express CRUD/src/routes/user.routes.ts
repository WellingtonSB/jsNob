import { Router } from "express";
const router = Router();

import {
  getUsers,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

router.get("/users", getUsers);
router.get("/users/:id", getByIdUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
