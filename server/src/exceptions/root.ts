export class HttpException extends Error {
  message: string;
  statusCode: number;
  error: any;
  errorCode: ErrorCodes;
  constructor(
    message: string,
    statusCode: number,
    error: any,
    errorCode: ErrorCodes
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.error = error;
  }
}
export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST = 1002,
  INVALID_VALIDATION = 1003,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UnAUTHORIZED = 4001,
}
