import jwt from "jsonwebtoken";
import {ENV} from "../config/env.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
        expiresIn: "7d",
    });

    const isProduction = ENV.NODE_ENV === "production";

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",  // none for HTTPS, lax for HTTP
        secure: isProduction,                       // true for HTTPS, false for HTTP
        path: "/",
    });

    return token;
};