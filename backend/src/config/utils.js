import jwt from "jsonwebtoken";
import {ENV} from "../config/env.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, ENV.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevents XSS attacks
        sameSite: "none", // Changed from "none" to "lax"
        secure: false, // OK for development HTTP
    });

    return token;
};