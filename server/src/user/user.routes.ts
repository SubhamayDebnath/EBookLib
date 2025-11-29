import { Router } from "express";
import { createUser, loginUser } from "./user.controller.ts";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
