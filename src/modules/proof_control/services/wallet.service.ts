import { Injectable } from '@nestjs/common';
import {
  CreateWalletDto,
  WalletResponse,
  UpdateWalletDto,
} from '../types/wallet.dto';
import { PaginateDto } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { ServiceError } from 'src/lib/error/error.type';
import HRMErrors from 'src/htm.errors';
import { WalletRepository } from '../repositories/wallet.repository';
import { Users } from 'src/database/entities-index';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async create(createWalletDto: CreateWalletDto): Promise<WalletResponse> {
    try {
      const user = await this.walletRepository.manager.findOne(Users, {
        where: { id: createWalletDto.userId },
      });
      if (!user) {
        throw new ServiceError(HRMErrors.USER_NOT_EXISTS());
      }
      const wallet = this.walletRepository.create({
        ...createWalletDto,
        user,
      });

      const savedWallet = await this.walletRepository.save(wallet);

      return savedWallet;
    } catch (error) {
      console.log('Data is not saved in the database for wallet', error);
      throw error;
    }
  }

  async list(
    paginateDto: PaginateDto,
  ): Promise<PaginateResponse<WalletResponse>> {
    return await this.walletRepository.list(paginateDto);
  }

  async update(id: string, payload: UpdateWalletDto): Promise<WalletResponse> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: { id },
      });
      if (!wallet) {
        throw new ServiceError(HRMErrors.WALLET_NOT_EXISTS());
      }
      Object.assign(wallet, { ...payload });
      const updatedWallet = await this.walletRepository.save(wallet);
      return updatedWallet;
    } catch (error) {
      throw new ServiceError(HRMErrors.WALLET_UPDATE_NOT_EXISTS());
    }
  }

  async delete(id: string): Promise<WalletResponse> {
    const wallet = await this.walletRepository.findOne({
      where: { id },
    });
    if (!wallet) {
      throw new ServiceError(HRMErrors.WALLET_NOT_EXISTS());
    }
    await this.walletRepository.delete({ id });
    return wallet;
  }

  async recharge(id: string, amount: number): Promise<WalletResponse> {
    try {
      const wallet = await this.walletRepository.findOne({ where: { id } });
      if (!wallet) {
        throw new ServiceError(HRMErrors.WALLET_NOT_EXISTS());
      }
      wallet.balance += amount;
      await this.walletRepository.save(wallet);
      return wallet;
    } catch (error) {
      console.log('Error during wallet recharge', error);
      throw error;
    }
  }

  async checkBalance(document: string, phoneNumber: number): Promise<number> {
    try {
      const wallet = await this.walletRepository.findOne({
        where: { user: { document, phoneNumber } },
      });
      if (!wallet) {
        throw new ServiceError(HRMErrors.WALLET_NOT_EXISTS());
      }
      return wallet.balance;
    } catch (error) {
      console.log('Error during balance check', error);
      throw error;
    }
  }
}
