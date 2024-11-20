import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './proof_control/controllers/users.controller';
import { UsersRepository } from './proof_control/repositories/users.repository';
import { UsersService } from './proof_control/services/users.service';
import { WalletController } from './proof_control/controllers/wallet.controller';
import { TransactionController } from './proof_control/controllers/transaction.controller';
import { WalletRepository } from './proof_control/repositories/wallet.repository';
import { TransactionRepository } from './proof_control/repositories/transaction.repository';
import { WalletService } from './proof_control/services/wallet.service';
import { TransactionService } from './proof_control/services/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, WalletRepository, TransactionRepository])],
  controllers: [UsersController, WalletController, TransactionController],
  providers: [
    UsersService,
    WalletService,
    TransactionService,
    UsersRepository,
    WalletRepository,
    TransactionRepository
  ],
  exports: [UsersService, WalletService, TransactionService],
})
export class ProofControl {}
