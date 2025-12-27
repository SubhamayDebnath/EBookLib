import { Router } from "express";
const router = Router();
// Import user routes
import userRoutes from "../modules/users/user.routes.js";
router.use("/user", userRoutes);

export default router;