import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/appError';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

export const authGuard = (roles: string[] = []) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw AppError.unauthorized();
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, env.auth.jwtSecret) as { sub: string; roles?: string[] };
      req.user = {
        id: payload.sub,
        roles: payload.roles ?? []
      };

      if (roles.length && !roles.some((role) => req.user?.roles.includes(role))) {
        throw AppError.unauthorized('Insufficient permissions');
      }

      next();
    } catch (error) {
      throw AppError.unauthorized((error as Error).message);
    }
  };
};
