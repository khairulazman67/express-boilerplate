import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  ForbiddenError,
  NotFoundError,
} from "../utils/errors/DynamicCustomError";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Custom Request Type with User
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

// Middleware to Verify Access Token
export const verifyAccessToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new NotFoundError("Access token is missing");
  }

  const token = authHeader.split(" ")[1];
  try {
    if (ACCESS_TOKEN_SECRET === undefined)
      throw new ForbiddenError("ACCESS_TOKEN_SECRET is not defined");
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      id: number;
      email: string;
    };
    req.user = user;
    next();
  } catch (error) {
    throw new ForbiddenError("Invalid or expired access token");
  }
};
