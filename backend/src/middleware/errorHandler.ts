import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../config/logger';
import { AppError } from '../utils/appError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof AppError) {
    const { statusCode, message, details } = err;
    if (statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
      logger.error('Unhandled AppError', { message, details });
    }
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        details
      }
    });
    return;
  }

  logger.error('Unexpected error', { err });
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      message: 'Internal Server Error'
    }
  });
};
