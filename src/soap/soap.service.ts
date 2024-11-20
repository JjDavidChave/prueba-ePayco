import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/proof_control/services/users.service';
import { WalletService } from 'src/modules/proof_control/services/wallet.service';
import { TransactionService } from 'src/modules/proof_control/services/transaction.service';
import { CreateUserDto } from 'src/modules/proof_control/types/users.dto';
import { CreateWalletDto } from 'src/modules/proof_control/types/wallet.dto';
import { CreateTransactionDto } from 'src/modules/proof_control/types/transaction.dto';

@Injectable()
export class SoapService {
  constructor(
    private readonly userService: UsersService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.create(createUserDto);
    return `User ${user.name} registered successfully.`;
  }

  async rechargeWallet(id: string, amount: number): Promise<string> {
    const wallet = await this.walletService.recharge(id, amount);
    return `Wallet recharged successfully with amount ${amount}.`;
  }

  async pay(createTransactionDto: CreateTransactionDto): Promise<{ sessionId: string, result: string }> {
    const transaction = await this.transactionService.create(createTransactionDto);
    return { sessionId: transaction.sessionId, result: 'Payment processed successfully.' };
  }

  async confirmPayment(sessionId: string, token: string): Promise<string> {
    const result = await this.transactionService.confirmPayment(sessionId, token);
    return result ? 'Payment confirmed successfully.' : 'Payment confirmation failed.';
  }

  async checkBalance(document: string, phoneNumber: number): Promise<number> {
    const balance = await this.walletService.checkBalance(document, phoneNumber);
    return balance;
  }
}

