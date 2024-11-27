import rfs from "rotating-file-stream";
import { logger } from "./pino";

const logDirectory = "logs";

const stream = rfs.createStream("./logs/file/app.log", {
  interval: "5s", // Rotasi setiap hari
  path: logDirectory,
  size: "10M", // Ukuran maksimal file log sebelum digulirkan
  compress: "gzip", // Mengkompres file log lama
});

export default logger;
