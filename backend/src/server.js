// Initialize monitoring (must be first) for sentry//
import "../instrument.mjs";

import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";

// Local imports //
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import channelRoutes from "./routes/channel.routes.js";

const app = express();

// Enable CORS (allow frontend to communicate with backend)
app.use(
  cors({
    origin: true, // allow all origins (you can restrict this in production)
    credentials: true, // allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Parse cookies from request headers
app.use(cookieParser());

// Parse JSON and URL-encoded data with size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


// API ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/channel", channelRoutes);


// Must be AFTER routes
Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    // Start server
    app.listen(ENV.PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Run server
startServer();