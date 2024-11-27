import Redis from "ioredis";

const port = process.env.REDIS_PORT ?? 6379;
const redis = new Redis({
  host: process.env.REDIS_HOST, // Default: localhost
  port: 6379, // Default: 6379
  password: process.env.REDIS_PASSWORD, // Jika Redis menggunakan password
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;
