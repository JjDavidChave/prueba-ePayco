import J = require('joi');

export const CreateUserSchema = J.object({
  document: J.string().required(),
  email: J.string().required().email(),
  name: J.string().required(),
  phoneNumber: J.number().required(),
});

export const UpdateUserSchema = J.object({
  document: J.string().optional(),
  email: J.string().optional().email(),
  name: J.string().optional(),
  phoneNumber: J.number().optional(),
});

export class CreateUserDto {
  document: string;
  email: string;
  name: string;
  phoneNumber: number;
}

export class UpdateUserDto {
  document?: string;
  email?: string;
  phoneNumber?: number;
  name?: string;
}

export class UserDtoResponse {
  id: string;
  document: string;
  email: string;
  name: string;
  phoneNumber: number;
  createdAt: Date;
  updatedAt: Date;
}
