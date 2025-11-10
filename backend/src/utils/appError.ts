import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(statusCode: number, message?: string, details?: unknown) {
    super(message ?? getReasonPhrase(statusCode));
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  static unauthorized(message = 'Unauthorized'): AppError {
    return new AppError(StatusCodes.UNAUTHORIZED, message);
  }

  static badRequest(message = 'Bad Request', details?: unknown): AppError {
    return new AppError(StatusCodes.BAD_REQUEST, message, details);
  }

  static notFound(message = 'Not Found'): AppError {
    return new AppError(StatusCodes.NOT_FOUND, message);
  }
}
