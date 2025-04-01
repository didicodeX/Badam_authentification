import { Router } from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js"
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/users", auth, userRoutes);
router.use("/auth", authRoutes)

export default router;
