import { Document, Model, Schema, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  phone?: string;
  password: string;
  fullName: string;
  roles: string[];
  status: 'pending' | 'active' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, index: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    roles: { type: [String], default: ['user'] },
    status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' }
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> = model<IUser>('User', userSchema);
