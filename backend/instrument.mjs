import * as Sentry from "@sentry/node";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
require("dotenv/config");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
  includeLocalVariables: true,
  sendDefaultPii: true,
});