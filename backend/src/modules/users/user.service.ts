import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/appError';
import { comparePassword, hashPassword } from '../../utils/password';
import { IUser, UserModel } from './user.model';

export interface CreateUserInput {
  email: string;
  phone?: string;
  password: string;
  fullName: string;
  roles?: string[];
}

export const createUser = async (payload: CreateUserInput): Promise<IUser> => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw AppError.badRequest('Email already registered');
  }

  const user = new UserModel({
    email: payload.email,
    phone: payload.phone,
    password: await hashPassword(payload.password),
    fullName: payload.fullName,
    roles: payload.roles ?? ['user'],
    status: 'active'
  });

  return user.save();
};

export const verifyUserCredentials = async (email: string, password: string): Promise<IUser> => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw AppError.badRequest('Invalid credentials');
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw AppError.badRequest('Invalid credentials');
  }

  if (user.status !== 'active') {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is not active');
  }

  return user;
};

export const findUserById = async (id: string): Promise<IUser> => {
  const user = await UserModel.findById(id).select('-password');
  if (!user) {
    throw AppError.notFound('User not found');
  }
  return user;
};
