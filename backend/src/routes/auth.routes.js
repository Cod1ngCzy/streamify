import express from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";
import {authenticateToken} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req,res) => {
    res.send("Welcome to Streamify");
});

router.post("/sign-up", signUp);

router.post("/sign-in", signIn);

router.post("/sign-out", signOut);

router.get("/check", authenticateToken, (req, res) => {
    res.status(200).json(req.user);
});


export default router;