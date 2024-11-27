import "reflect-metadata";
import express from "express";
import "./dependencyInjection";
import AuthRoute from "./routes/auth.route";
import { BadRouteError } from "./utils/errors/DynamicCustomError";
import { errorHandler } from "./middleware/error-handler.middleware";
import { logger } from "./logs/pino";
import { pinoHttp } from "pino-http";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
if (process.env.HTTP_LOG_ENABLED === "true") {
  app.use(pinoHttp({ logger }));
}

app.use("/v1/auth", AuthRoute);

app.all("/*", () => {
  throw new BadRouteError();
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
