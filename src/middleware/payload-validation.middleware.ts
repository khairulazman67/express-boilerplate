import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { InvalidPayloadError } from "../utils/errors/DynamicCustomError";

// Middleware untuk validasi
function validate(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success)
      throw new InvalidPayloadError("Invalid payload", validationResult.error);

    req.body = validationResult.data; // Mengupdate req.body dengan data yang tervalidasi
    next();
  };
}

export default validate;
