import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayload {
  sub: string;
  roles?: string[];
}

export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.auth.jwtSecret, {
    expiresIn: env.auth.jwtExpiresIn
  });
};
