import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", authenticateToken, getStreamToken);

export default router;