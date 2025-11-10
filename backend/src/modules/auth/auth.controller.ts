import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth.service';

export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  const result = await registerUser(req.body);
  res.status(201).json({
    success: true,
    data: result
  });
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const result = await loginUser(req.body.email, req.body.password);
  res.json({
    success: true,
    data: result
  });
};
