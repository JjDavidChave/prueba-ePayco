import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../modules/proof_control/types/users.dto';
import { CreateWalletDto } from '../modules/proof_control/types/wallet.dto';
import { CreateTransactionDto } from '../modules/proof_control/types/transaction.dto';
import { SoapService } from './soap.service';

@Controller('soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) {}

  @Post('registerUser')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return this.soapService.registerUser(createUserDto);
  }

  @Post('rechargeWallet')
  async rechargeWallet(@Body() rechargeWalletDto: { id: string, amount: number }): Promise<string> {
    const { id, amount } = rechargeWalletDto;
    return this.soapService.rechargeWallet(id, amount);
  }

  @Post('pay')
  async pay(@Body() createTransactionDto: CreateTransactionDto): Promise<{ sessionId: string, result: string }> {
    return this.soapService.pay(createTransactionDto);
  }

  @Post('confirmPayment')
  async confirmPayment(@Body('sessionId') sessionId: string, @Body('token') token: string): Promise<string> {
    return this.soapService.confirmPayment(sessionId, token);
  }

  @Post('checkBalance')
  async checkBalance(@Body('document') document: string, @Body('phoneNumber') phoneNumber: number): Promise<number> {
    return this.soapService.checkBalance(document, phoneNumber);
  }
}
