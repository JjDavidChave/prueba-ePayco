import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import {
  CreateTransactionDto,
  TransactionDtoResponse,
  UpdateTransactionDto,
} from '../types/transaction.dto';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { ServiceError } from 'src/lib/error/error.type';
import HRMErrors from 'src/htm.errors';
import { Wallet } from 'src/database/entities/wallet';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<TransactionDtoResponse> {
    try {
      const wallet = await this.transactionRepository.manager.findOne(Wallet, {
        where: { id: createTransactionDto.walletId },
      });
      if (!wallet) {
        throw new ServiceError(HRMErrors.WALLET_NOT_EXISTS());
      }
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        wallet,
      });

      const savedTransaction = await this.transactionRepository.save(transaction);

      return savedTransaction;
    } catch (error) {
      console.log('Data is not saved in the database for transaction', error);
      throw error;
    }
  }

  async list(
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<TransactionDtoResponse>> {
    return await this.transactionRepository.list(paginateDto);
  }

  async update(
    id: string,
    payload: UpdateTransactionDto,
  ): Promise<TransactionDtoResponse> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
      });
      if (!transaction) {
        throw new ServiceError(HRMErrors.TRANSACTION_NOT_EXISTS());
      }
      Object.assign(transaction, { ...payload });
      const updatedTransaction =
        await this.transactionRepository.save(transaction);
      return updatedTransaction;
    } catch (error) {
      throw new ServiceError(HRMErrors.TRANSACTION_UPDATE_NOT_EXISTS());
    }
  }

  async delete(id: string): Promise<TransactionDtoResponse> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new ServiceError(HRMErrors.TRANSACTION_NOT_EXISTS());
    }
    await this.transactionRepository.delete({ id });
    return transaction;
  }

  async confirmPayment(sessionId: string, token: string): Promise<boolean> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { sessionId, token, status: 'PENDING' },
      });
      if (!transaction) {
        throw new ServiceError(HRMErrors.TRANSACTION_NOT_EXISTS());
      }
      transaction.status = 'COMPLETED';
      await this.transactionRepository.save(transaction);
      return true;
    } catch (error) {
      console.log('Error during payment confirmation', error);
      throw error;
    }
  }
}
