import J = require('joi');

export const CreateTransactionSchema = J.object({
  type: J.string().valid('RECHARGE', 'PAYMENT').required(),
  amount: J.number().precision(2).positive().required(),
  walletId: J.string().uuid().required(),
  sessionId: J.string().optional(),
  token: J.string().optional(),
});

export const UpdateTransactionSchema = J.object({
  status: J.string().valid('PENDING', 'COMPLETED', 'FAILED').optional(),
});

export class CreateTransactionDto {
    type: 'RECHARGE' | 'PAYMENT';
    amount: number;
    walletId: string; 
    sessionId?: string;
    token?: string;
  }
  
  export class UpdateTransactionDto {
    status?: 'PENDING' | 'COMPLETED' | 'FAILED';
  }
  
  export class TransactionDtoResponse {
    id: string;
    type: 'RECHARGE' | 'PAYMENT';
    walletId: string;
    amount: number;
    sessionId?: string;
    token?: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    createdAt: Date;
  }
  