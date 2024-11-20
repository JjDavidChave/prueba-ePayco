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
  CreateTransactionDto,
  CreateTransactionSchema,
  TransactionDtoResponse,
  UpdateTransactionDto,
  UpdateTransactionSchema,
} from '../types/transaction.dto';
import { PaginateDto, PaginateSchema } from 'src/lib/paginate/paginate.type';
import { PaginateResponse } from 'src/lib/paginate/paginate.service';
import { TransactionService } from '../services/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/')
  async create(
    @Body(new JoiValidationPipe(CreateTransactionSchema))
    body: CreateTransactionDto,
  ): Promise<TransactionDtoResponse> {
    return await this.transactionService.create(body);
  }

  @Get('/')
  async list(
    @Query(new JoiValidationPipe(PaginateSchema)) params: PaginateDto,
  ): Promise<PaginateResponse<TransactionDtoResponse>> {
    return await this.transactionService.list(params);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateTransactionSchema))
    body: UpdateTransactionDto,
  ): Promise<TransactionDtoResponse> {
    return this.transactionService.update(id, body);
  }

  @Delete('/:id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<TransactionDtoResponse> {
    return await this.transactionService.delete(id);
  }
}
