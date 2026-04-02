import express from "express";
import {authenticateToken} from "../middleware/auth.middleware.js";
import {createChannel, addMember, getChannels} from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/create", authenticateToken, createChannel);
router.post("/add", authenticateToken, addMember);
router.get("/channels", authenticateToken, getChannels);

export default router;
