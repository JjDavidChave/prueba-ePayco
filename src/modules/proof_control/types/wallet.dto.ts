import J = require('joi');

export const CreateWalletSchema = J.object({
  balance: J.number().required(),
  userId: J.string().uuid().required(),
});

export const UpdateWalletSchema = J.object({
  balance: J.number().optional(),
});

export class CreateWalletDto {
  balance: number;
  userId: string;
}

export class UpdateWalletDto {
  balance?: number;
}

export class WalletResponse {
  id: string;
  balance: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
