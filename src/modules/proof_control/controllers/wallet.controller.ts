import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/lib/JoiValidationPipe';
import {
  CreateWalletDto,
  CreateWalletSchema,
  WalletResponse,
  UpdateWalletDto,
  UpdateWalletSchema,
} from '../types/wallet.dto';
import { PaginateDto, PaginateSchema } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { WalletService } from '../services/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/')
  async create(
    @Body(new JoiValidationPipe(CreateWalletSchema))
    body: CreateWalletDto,
  ): Promise<WalletResponse> {
    return await this.walletService.create(body);
  }

  @Get('/')
  async list(
    @Query(new JoiValidationPipe(PaginateSchema)) params: PaginateDto,
  ): Promise<PaginateResponse<WalletResponse>> {
    return await this.walletService.list(params);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateWalletSchema))
    body: UpdateWalletDto,
  ): Promise<WalletResponse> {
    return await this.walletService.update(id, body);
  }

  @Delete('/:id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<WalletResponse> {
    return await this.walletService.delete(id);
  }
}
