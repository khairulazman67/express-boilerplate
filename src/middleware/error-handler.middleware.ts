import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors/CustomError";
import { FormatterResponse } from "../utils/response/formatterResponse";
import { NotFoundError } from "../utils/errors/DynamicCustomError";
// import { logger } from "../logs/pino";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // logger.error(err);
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.formatErrors());
  }

  res
    .status(400)
    .send(
      FormatterResponse.error(
        "Something went wrong",
        400,
        process.env.NODE_ENV === "development" ? err.stack : undefined
      )
    );
};
