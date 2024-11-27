import { users } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../../redisClient";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (user: users): string => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};
export const generateRefreshToken = async (user: users): Promise<string> => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Store refresh token in Redis with TTL 7 days
  await redis.set(
    `refresh_token_${process.env.APP_NAME}:${user.id}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
  return refreshToken;
};

export const validateRefreshToken = async (
  userId: number,
  token: string
): Promise<boolean> => {
  const storedToken = await redis.get(
    `refresh_token_${process.env.APP_NAME}:${userId}`
  );
  return storedToken === token;
};
