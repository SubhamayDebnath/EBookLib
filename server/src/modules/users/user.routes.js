import { Router } from "express";
import validate from "../../middleware/validate.middleware.js";
import { createUserSchema } from "../../validators/user.validation.js";
import { createUser } from "./user.controller.js";

const router = Router();
router.post("/register", validate(createUserSchema), createUser);

export default router;
