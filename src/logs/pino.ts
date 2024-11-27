import pino from "pino";

export const logger = pino({
  enabled: process.env.LOG_ENABLED === "true",
  level: "trace",
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino-pretty",
        level: "trace",
        options: {
          destination: "./logs/file/app.log",
          mkdir: true,
          colorize: false,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
      ...(process.env.MONGO_LOG_ENABLED === "true"
        ? [
            {
              target: "pino-mongodb",
              options: {
                uri: process.env.MONGO_LOG_URL,
                database: process.env.MONGO_DB_LOG,
                collection: "logCollection",
                colorize: true,
                translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
              },
            },
          ]
        : []),
    ],
  },
});
