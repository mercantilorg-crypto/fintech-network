import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../utils/appError';

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw AppError.badRequest('Validation error', error.flatten());
      }
      throw error;
    }
  };
};
