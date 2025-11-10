import { signToken } from '../../utils/token';
import { createUser, verifyUserCredentials } from '../users/user.service';
import { CreateUserInput } from '../users/user.service';

export const registerUser = async (input: CreateUserInput) => {
  const user = await createUser(input);
  const token = signToken({ sub: user.id, roles: user.roles });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles
    }
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await verifyUserCredentials(email, password);
  const token = signToken({ sub: user.id, roles: user.roles });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles
    }
  };
};
