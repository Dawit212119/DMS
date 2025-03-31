import { ErrorCodes, HttpException } from "./root";

export class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes, error?: any) {
    super(message, 401, error, errorCode);
  }
}
