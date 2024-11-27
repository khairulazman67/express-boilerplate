export abstract class CustomError extends Error {
  abstract statusCode: number;
  stackTrace?: string;
  constructor() {
    super();
    this.stackTrace = this.stack;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract formatErrors(): { message: string; field?: string };
}
